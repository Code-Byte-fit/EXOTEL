const express = require("express");
const router = express.Router();
const { TaskAllocation, Users, Rooms } = require("../models");

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
    // console.log(response);
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
