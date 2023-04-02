const express = require("express");
const router = express.Router();
const {
  TaskAllocation,
  Users,
  Rooms,
  Reservations,
  ReservationRoom,
  TaskCount,
} = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const listOfTasks = await TaskAllocation.findAll({
    include: [
      {
        model: Users,
        attributes: ["FirstName"],
      },
    ],
  });
  res.json(listOfTasks);
});

//fetch the room boy ids and the names from user table and room numbers from rooms table
router.get("/taskDetails", async (req, res) => {
  try {
    // Finds all the room numbers from the rooms table.
    const rooms = await Rooms.findAll({
      attributes: ["RoomNo"],
    });

    // Finds all the room boy IDs and names from the users table.
    const roomBoy = await Users.findAll({
      attributes: ["userId", "FirstName"],
    });

    // Creates an array of objects containing only the room numbers.
    const roomDetails = rooms.map((room) => ({
      RoomNo: room.RoomNo,
    }));

    // Creates an array of objects containing the room boy IDs and names.
    const roomBoyDetails = roomBoy.map((roomBoy) => ({
      RoomBoyId: roomBoy.userId,
      RoomBoyName: roomBoy.FirstName,
    }));

    // Creates a response object with the room details and room boy details.
    const response = {
      roomDetails: roomDetails,
      roomBoyDetails: roomBoyDetails,
    };

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/autoSchedule", async (req, res) => {
  try {
    const curr = new Date();
    const date = curr.toISOString().substring(0, 10);

    const checkOuts = await Reservations.findAll({
      attributes: ["id"],
      where: {
        CheckOut: { [Op.eq]: "2023-04-30" },
      },
    });

    let checkOutRoomDetails = [];

    await Promise.all(
      checkOuts.map(async (room) => {
        const checkOutRooms = await ReservationRoom.findAll({
          attributes: ["RoomRoomNo"],
          where: {
            ReservationId: { [Op.eq]: room.id },
          },
        });

        checkOutRooms.map(({ RoomRoomNo }) => {
          checkOutRoomDetails.push(RoomRoomNo);
        });
      })
    );

    // await Promise.all(
    //   checkOutRoomDetails.map(async (RoomNo) => {
    //     const roomBoy = await TaskCount.findOne({
    //       order: [["taskCount", "ASC"]],
    //     });

    //     const { userId } = roomBoy;
    //     const { taskCount } = roomBoy;

    //     // await TaskAllocation.create({
    //     //   RoomNo: RoomNo,
    //     //   userId: userId,
    //     //   taskType: "clean",
    //     //   taskDate: "2023-04-30",
    //     //   taskTime: "00:00:00",
    //     //   Notes: "",
    //     //   ReservationId: 12,
    //     // });

    //     await TaskCount.update(
    //       {
    //         taskCount: taskCount + 1,
    //       },
    //       { where: { userId: userId } }
    //     );
    //   })
    // );

    for (const RoomNo of checkOutRoomDetails) {
      const roomBoy = await TaskCount.findOne({
        order: [["taskCount", "ASC"]],
      });

      const { userId, taskCount } = roomBoy;

      console.log(userId, taskCount);

      await TaskCount.update(
        {
          taskCount: taskCount + 1,
        },
        { where: { userId: userId } }
      );
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//store the task details taken from the form to the database and find the reservation number for the respective rooms
router.post("/", async (req, res) => {
  try {
    // Extracts the required data from the request body.
    const { RoomNo, userId, taskType, taskDate, taskTime, Notes } = req.body;

    // Finds the reservation ID for the given room and date.
    const reservation = await Reservations.findOne({
      attributes: ["id"],
      include: [
        {
          model: Rooms,
          through: {
            model: ReservationRoom,
            where: { RoomRoomNo: { [Op.eq]: RoomNo } },
          },
        },
      ],
      where: {
        CheckIn: {
          [Op.lte]: taskDate,
        },
        CheckOut: {
          [Op.gte]: taskDate,
        },
      },
    });

    // Extracts the reservation ID from the reservation object.
    const { id } = reservation;

    // Creates a new task allocation record with the given details and reservation ID.
    const newTask = await TaskAllocation.create({
      RoomNo,
      userId,
      taskType,
      taskDate,
      taskTime,
      Notes,
      ReservationId: id,
    });

    res.status(201).json({ newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

//edit the records in the table
router.put("/", async (req, res) => {
  try {
    // Extracts the required data from the request body.
    const { taskNo, RoomNo, userId, taskType, taskDate, taskTime, Notes } =
      req.body;

    // Finds the reservation ID for the given room and date.
    const reservation = await Reservations.findOne({
      attributes: ["id"],
      include: [
        {
          model: Rooms,
          through: {
            model: ReservationRoom,
            where: { RoomRoomNo: { [Op.eq]: RoomNo } },
          },
        },
      ],
      where: {
        CheckIn: {
          [Op.lte]: taskDate,
        },
        CheckOut: {
          [Op.gte]: taskDate,
        },
      },
    });

    // Extracts the reservation ID from the reservation object.
    const { id } = reservation;

    // Updates the task allocation record with the given task number with the provided details and reservation ID in the database.
    await TaskAllocation.update(
      {
        RoomNo,
        userId,
        taskType,
        taskDate,
        taskTime,
        Notes,
        ReservationId: id,
      },
      { where: { taskNo: taskNo } }
    );

    res.status(201).json("Updated Successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// retrieve only the room number
// router.get("/taskDetails", async (req, res) => {
//   try {
//     const rooms = await Rooms.findAll({
//       attributes: ["RoomNo"],
//     });
//     console.log(rooms);
//     const roomNumbers = rooms.map((room) => room.RoomNo);
//     res.json(roomNumbers);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// router.post("/", async (req, res) => {
//   console.log("call");
//   const task = req.body;
//   await TaskAllocation.create(task);
//   res.json(task);
// });

module.exports = router;
