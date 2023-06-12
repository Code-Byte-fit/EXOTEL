const express = require("express");
const router = express.Router();
const { Rooms, Guests, Reservations, HotelStatus } = require("../models");
const { Op, Sequelize } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const ReservationsDetails = await Reservations.findAll({
      attributes: ["id", "CheckIn", "CheckInTime", "CheckOut", "CheckOutTime"],
      include: [
        {
          model: Guests,
          attributes: ["id", "FirstName"],
        },
      ],
    });
    console.log(ReservationsDetails);
    res.json(ReservationsDetails);
  } catch (error) {
    res.status(500).json({ error: "occured when retrieving reservations" });
  }
});

//change

router.get("/conflictReservations/:startDate/:endDate", async (req, res) => {
  const startDate = req.params.startDate;
  // const startTime = req.params.startTime;
  const endDate = req.params.endDate;
  // const endTime = req.params.endTime;

  try {
    const reservations = await Reservations.findAll({
      attributes: ["id", "CheckIn", "CheckInTime", "CheckOut", "CheckOutTime"],
      include: [
        {
          model: Guests,
          attributes: ["id", "FirstName"],
        },
      ],
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { CheckIn: { [Op.gte]: startDate } },
              { CheckOut: { [Op.lte]: endDate } },
            ],
          },
          {
            [Op.and]: [
              { CheckIn: { [Op.eq]: startDate } },
              { CheckOut: { [Op.eq]: endDate } },
            ],
          },
          {
            [Op.and]: [
              { CheckIn: { [Op.lte]: startDate } },
              { CheckOut: { [Op.gte]: startDate } },
              { CheckOut: { [Op.lte]: endDate } },
            ],
          },
          {
            [Op.and]: [
              { CheckIn: { [Op.gte]: startDate } },
              { CheckIn: { [Op.lte]: endDate } },
              { CheckOut: { [Op.gte]: endDate } },
            ],
          },
          {
            [Op.and]: [
              { CheckIn: { [Op.lte]: startDate } },
              { CheckIn: { [Op.lte]: endDate } },
              { CheckOut: { [Op.gte]: startDate } },
              { CheckOut: { [Op.gte]: endDate } },
            ],
          },
        ],
      },
    });
    // console.log("rese", reservations);

    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occured while retrieving rooms" });
  }
});

router.post("/", async (req, res) => {
  try {
    // Extract the required data from the request body.
    let { startDate, endDate } = req.body;

    // Create a new request record with the given details and reservation ID.
    const newStatus = await HotelStatus.create({
      startDate,
      endDate,
    });

    res.status(201).json(newStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Status" });
  }
});

module.exports = router;
