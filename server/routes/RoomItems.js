const express = require("express");
const router = express.Router();
const { RoomItems, RoomTypes, ItemRoomTypes } = require("../models");
const { Op, Sequelize } = require("sequelize");

// router.get("/", async (req, res) => {
//   const listOfItems = await RoomItems.findAll();
//   res.json(listOfItems);
// });

router.get("/", async (req, res) => {
  try {
    const roomItems = await RoomItems.findAll({});
    res.json(roomItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.get("/roomTypes", async (req, res) => {
//   try {
//     const roomtypes = await RoomTypes.findAll({
//       attributes: ["TypeName"],
//     });
//     console.log(roomtypes);
//     res.json(roomtypes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    // Extract the required data from the request body.
    const { RoomItemName, Cost } = req.body;

    // Create a new room item record with the given details.
    const newItem = await RoomItems.create({
      // RoomItemNo,
      RoomItemName,
      Cost,
    });

    console.log(newItem);

    res.status(201).json({ newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Item" });
  }
});

router.put("/", async (req, res) => {
  try {
    // Extract the required data from the request body.
    const { RoomItemName, Cost, RoomItemNo } = req.body;

    // Create a new room item record with the given details.
    await RoomItems.update(
      {
        RoomItemName,
        Cost,
      },
      {
        where: { RoomItemNo: RoomItemNo },
      }
    );

    res.status(201).json("Updated Successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Update Item" });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { RoomItemNo, RoomItemName, Cost, roomTypes } = req.body;
//     console.log("asdjfdb");
//     console.log(RoomItemNo);
//     const newItem = await RoomItems.create({
//       RoomItemNo,
//       RoomItemName,
//       Cost,
//     });

//     console.log(newItem);
//     res.status(201).json({ newItem });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create task" });
//   }
// });

module.exports = router;
