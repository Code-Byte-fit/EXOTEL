const express = require("express");
const router = express.Router();
const { Rooms, RoomItems, RepairRequest } = require("../models");
const { Op, Sequelize } = require("sequelize");

router.get("/", async (req, res) => {
  const listOfRepairs = await RepairRequest.findAll({
    include: [
      {
        model: RoomItems,
        attributes: ["RoomItemName"],
      },
    ],
  });

  res.json(listOfRepairs);
});

router.get("/repairItemDetails", async (req, res) => {
  try {
    // Find room numbers
    const rooms = await Rooms.findAll({
      attributes: ["RoomNo"],
    });

    const items = await RoomItems.findAll({
      attributes: ["RoomItemNo", "RoomItemName"],
    });

    const roomDetails = rooms.map((room) => ({
      RoomNo: room.RoomNo,
    }));

    const itemDetails = items.map((item) => ({
      roomItemNo: item.RoomItemNo,
      RoomItemName: item.RoomItemName,
    }));

    const response = {
      roomDetails: roomDetails,
      itemDetails: itemDetails,
    };

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract the required data from the request body.
    let { RoomNo, RoomItemNo, DoneStatus, Notes } = req.body;

    // Create a new request record with the given details and reservation ID.
    const newRequest = await RepairRequest.create({
      RoomNo,
      RoomItemNo,
      DoneStatus,
      Notes,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update request" });
  }
});

router.put("/", async (req, res) => {
  try {
    // Extract the required data from the request body.
    let { RoomNo, RoomItemNo, DoneStatus, Notes, RepairRequestNo } = req.body;

    // Create a new request record with the given details and reservation ID.
    await RepairRequest.update(
      {
        RoomNo,
        RoomItemNo,
        DoneStatus,
        Notes,
      },
      { where: { RepairRequestNo: RepairRequestNo } }
    );

    res.status(201).json("Updated Successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update request" });
  }
});

router.put("/sentDetails", async (req, res) => {
  try {
    // Extract the required data from the request body.
    let { SentStatus, RepairRequestNo } = req.body;

    // Create a new request record with the given details and reservation ID.
    await RepairRequest.update(
      {
        SentStatus,
      },
      { where: { RepairRequestNo: RepairRequestNo } }
    );

    res.status(201).json("Updated Successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update request" });
  }
});

module.exports = router;
