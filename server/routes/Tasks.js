const express = require("express");
const router = express.Router();
const {
  TaskAllocation,
  Users,
  Rooms,
  TestTaskModel,
  Reservations,
  ReservationRoom,
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
  console.log(listOfTasks);
  res.json(listOfTasks);
});

router.get("/taskDetails", async (req, res) => {
  try {
    const rooms = await Rooms.findAll({
      attributes: ["RoomNo"],
    });
    console.log(rooms);

    const roomBoy = await Users.findAll({
      attributes: ["userId", "FirstName"],
    });

    const roomDetails = rooms.map((room) => ({
      RoomNo: room.RoomNo,
    }));

    const roomBoyDetails = roomBoy.map((roomBoy) => ({
      RoomBoyId: roomBoy.userId,
      RoomBoyName: roomBoy.FirstName,
    }));

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
        CheckOut: { [Op.eq]: date },
      },
    });
    console.log(checkOuts);

    checkOuts.map(async (room) => {
      const checkOutRooms = await ReservationRoom.findAll({
        attributes: ["RoomRoomNo"],
        where: {
          ReservationId: { [Op.eq]: room.id },
        },
      });
      console.log(checkOutRooms);
    });

    const roomBoys = await Users.findAll({
      attributes: ["userId"],
      where: {
        Role: { [Op.eq]: "Room Boy" },
      },
    });

    // console.log(roomBoys);

    // res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { RoomNo, userId, taskType, taskDate, taskTime, Notes } = req.body;
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

    const { id } = reservation;

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

router.put("/", async (req, res) => {
  try {
    const { taskNo, RoomNo, userId, taskType, taskDate, taskTime, Notes } =
      req.body;

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

    const { id } = reservation;

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
