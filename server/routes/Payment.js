const express = require("express");
const router = express.Router();
const { DuePayment, Reservation } = require("../models");

router.get("/duePayment", async (req, res) => {
  const listOfDuePayment = await DuePayment.findAll();
  res.json(listOfDuePayment);
});

router.get("/checkin/:reservationId", async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservation.findOne({
      where: { id: reservationId },
      attributes: ['CheckIn'],
    });

    if (reservation) {
      const checkInDate = reservation.CheckIn.toISOString().split('T')[0];
      res.json({ checkInDate });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/duePayment", async (req, res) => {
  const post = req.body;
  await DuePayment.create(post);
  res.json(post);
});

module.exports = router;
