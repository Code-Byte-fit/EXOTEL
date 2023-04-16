const express = require('express');
const router = express.Router();
const { Feedback } = require('../models');

router.get("/", async (req,  res) => {
  const ListOfFeedback = await Feedback.findAll();
  res.json(ListOfFeedback);
});

router.post("/", async (req, res) => {
  const { hospitality, hygiene, food, facilities, rooms } = req.body;
  try {
    const newFeedback = await Feedback.create({
      hospitality: parseInt(hospitality),
      hygiene: parseInt(hygiene),
      food: parseInt(food),
      facilities: parseInt(facilities),
      rooms: parseInt(rooms),
    });
    res.status(201).json(newFeedback);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
