const express = require("express");
const router = express.Router();
const { RoomTypes } = require("../models");

router.get("/", async (req, res) => {
  const listOfRoomTypes = await RoomTypes.findAll();
  res.json(listOfRoomTypes);
});

router.post("/", async (req, res) => {
  const { TypeName, View } = req.body;

  try {
    // Try to find an existing record with the same TypeName and View
    const existingRoomType = await RoomTypes.findOne({
      where: { TypeName, View },
    });

    if (existingRoomType) {
      // If a record with the same TypeName and View exists, return a 409 Conflict response
      res
        .status(409)
        .json({
          message: "A record with the given TypeName and View already exists",
        });
    } else {
      // Otherwise, create a new record with the given data
      await RoomTypes.create(req.body);
      res.json({ message: "Record created successfully" });
    }
  } catch (error) {
    // If an error occurs, manually set the RoomTypeID to the maximum existing value plus one
    const maxRoomTypeId = await RoomTypes.max("RoomTypeID");
    const roomType = {
      ...req.body,
      RoomTypeID: maxRoomTypeId ? maxRoomTypeId + 1 : 1,
    };
    await RoomTypes.create(roomType);
    res
      .status(500)
      .json({ message: "An error occurred while creating the record" });
  }
});

module.exports = router;
