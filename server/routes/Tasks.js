const express = require("express");
const router = express.Router();
const {
  TaskAllocations,
  Users,
  Rooms,
  Reservations,
  ReservationRoom,
  TaskCount,
} = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  const listOfTasks = await TaskAllocations.findAll({
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
    // Find room numbers
    const rooms = await Rooms.findAll({
      attributes: ["RoomNo"],
    });

    // Find room boy IDs and names
    const roomBoy = await Users.findAll({
      attributes: ["userId", "FirstName"],
    });

    // Create an array of objects containing only the room numbers.
    const roomDetails = rooms.map((room) => ({
      RoomNo: room.RoomNo,
    }));

    // Create an array of objects containing the room boy IDs and names.
    const roomBoyDetails = roomBoy.map((roomBoy) => ({
      RoomBoyId: roomBoy.userId,
      RoomBoyName: roomBoy.FirstName,
    }));

    // Create a response object with the room details and room boy details.
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

//store the task details taken from the form to the database and find the reservation number for the respective rooms
router.post("/", async (req, res) => {
  try {
    // Extract the required data from the request body.
    const { RoomNo, userId, taskType, taskDate, taskTime, Notes } = req.body;

    // Find the reservation ID for the given room and date.
    const reservation = await Reservations.findOne({
      attributes: ["id"],
      include: [
        {
          model: Rooms,
          through: {
            model: ReservationRoom,
          },
          where: { RoomNo: RoomNo },
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

    if (reservation != null) {
      // Extract the reservation ID from the reservation object.
      // reservation.map((reservation) => {
      //   console.log(reservation.Rooms, reservation.Rooms);
      //   if (reservation.Rooms) {
      //     console.log(reservation.id, reservation.Rooms);
      //   }
      // });
      const { id } = reservation;
      console.log(id);

      // Create a new task allocation record with the given details and reservation ID.
      const newTask = await TaskAllocations.create({
        RoomNo,
        userId,
        taskType,
        taskDate,
        taskTime,
        Notes,
        ReservationId: id,
      });

      res.status(201).json({ newTask });
    } else {
      res
        .status(500)
        .json({ error: "There is no reservation on this date for this room" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

//edit the records in the table
router.put("/", async (req, res) => {
  try {
    // Extract the required data from the request body.
    const { taskId, RoomNo, userId, taskType, taskDate, taskTime, Notes } =
      req.body;

    // Find the reservation ID for the given room and date.
    const reservation = await Reservations.findOne({
      attributes: ["id"],
      include: [
        {
          model: Rooms,
          through: {
            model: ReservationRoom,
          },
          where: { RoomRoomNo: { [Op.eq]: RoomNo } },
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

    // Extract the reservation ID from the reservation object.
    const { id } = reservation;

    // Update the task allocation record with the given task number
    await TaskAllocations.update(
      {
        RoomNo,
        userId,
        taskType,
        taskDate,
        taskTime,
        Notes,
        ReservationId: id,
      },
      { where: { taskId: taskId } }
    );

    res.status(201).json("Updated Successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.get("/automate", async (req, res) => {
  const date = new Date().toISOString().substring(0, 10);
  try {
    const reservation = await Reservations.findAll({
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
        CheckOut: {
          [Op.eq]: date,
        },
      },
    });

    console.log("test here", reservation);

    // const newTask = await TaskAllocations.create({
    //   RoomNo,
    //   userId,
    //   taskType,
    //   taskDate,
    //   taskTime,
    //   Notes,
    //   ReservationId: id,
    // });
  } catch (error) {}
});

//Automation of Task Allocation
// router.get("/autoSchedule", async (req, res) => {
//   try {
//     const curr = new Date();
//     const date = curr.toISOString().substring(0, 10);

//     //fetch the reservations for today's date
//     const checkOuts = await Reservations.findAll({
//       attributes: ["id"],
//       where: {
//         CheckOut: { [Op.eq]: "2023-04-30" },
//       },
//     });

//     let checkOutRoomDetails = [];

//     //
//     await Promise.all(
//       //find the rooms for each reservations
//       checkOuts.map(async (room) => {
//         const checkOutRooms = await ReservationRoom.findAll({
//           attributes: ["RoomRoomNo"],
//           where: {
//             ReservationId: { [Op.eq]: room.id },
//           },
//         });

//         //create an array containing room numbers
//         checkOutRooms.map(({ RoomRoomNo }) => {
//           checkOutRoomDetails.push(RoomRoomNo);
//         });
//       })
//     );

//     for (const RoomNo of checkOutRoomDetails) {
//       //fetch the lowest task count
//       const roomBoy = await TaskCount.findOne({
//         order: [["taskCount", "ASC"]],
//       });

//       const { userId, taskCount } = roomBoy;

//       console.log(userId, taskCount);

//       await TaskCount.update(
//         {
//           taskCount: taskCount + 1,
//         },
//         { where: { userId: userId } }
//       );
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
