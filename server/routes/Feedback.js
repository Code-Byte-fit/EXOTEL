const express = require('express');
const router = express.Router();
const { Feedback,Guests } = require('../models');

router.get("/", async (req,  res) => {
  const ListOfFeedback = await Feedback.findAll({
    include: [
      {
        model: Guests,
        attributes: ['id', 'FirstName']
      },
      
    ],
  });
  
  res.json(ListOfFeedback);
 
});

router.post("/", async (req, res) => {
 data= req.body;
  try {
    const newFeedback = await Feedback.create({
      emoji:data.emoji,
      hospitality: parseInt(data.stat.hospitality),
      hygiene: parseInt(data.stat.hygiene),
      food: parseInt(data.stat.food),
      facilities: parseInt(data.stat.facilities),
      rooms: parseInt(data.stat.rooms),
      guestId:data.guest,
    });
    res.status(201).json(newFeedback);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
