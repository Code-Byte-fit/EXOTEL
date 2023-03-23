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

router.post("/", async (req, res) => {
  try {
    const { RoomNo, userId, taskType, taskDate, taskTime, Notes } = req.body;
    console.log("abc");
    const reservation = await Reservations.findOne({
      attributes: ["id"],
      include: [
        {
          model: Rooms,
          through: {
            model: ReservationRoom,
            where: { RoomNo: { [Op.eq]: RoomNo } },
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
    console.log(reservation);

    const newTask = await TaskAllocation.create({
      RoomNo,
      userId,
      taskType,
      taskDate,
      taskTime,
      Notes,
      ReservationId: reservation.id,
    });

    console.log(newTask);
    res.status(201).json({ newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
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
