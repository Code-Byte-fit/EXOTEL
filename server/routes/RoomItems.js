const express = require("express");
const router = express.Router();
const { RoomItems, RoomTypes, ItemRoomTypes } = require("../models");
const { Op, Sequelize } = require("sequelize");

// router.get("/", async (req, res) => {
//   const listOfItems = await RoomItems.findAll();
//   res.json(listOfItems);
// });

router.get("/itemdetails", async (req, res) => {
  try {
    const roomItems = await RoomItems.findAll({});
    res.json(roomItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/roomTypes", async (req, res) => {
  try {
    const roomtypes = await RoomTypes.findAll({
      attributes: ["TypeName"],
    });
    console.log(roomtypes);
    res.json(roomtypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
