const express = require("express");
const router = express.Router();
const {Laundry, DuePayment,Addons} = require ("../models");
const { Op } = require('sequelize');

router.get("/", async (req, res) => {
    const listOfLaundry = await Laundry.findAll();
    res.json(listOfLaundry);
});


router.post('/', async (req, res) => {
  try {
    const { ReservationId,receivedDate, returnDate, load, type } = req.body;

    // Find the addon with matching type
    const addon = await Addons.findOne({
      where: {
        AddOn: type
      }
    });

    if (!addon) {
      return res.status(400).json({ error: 'Addon not found' }); 
    }

    // Calculate the charge by multiplying load with addon charge
    const charge = load * addon.Charge;

    // Create the laundry item with the calculated charge
    const laundry = await Laundry.create({
      ReservationId,
      receivedDate,
      returnDate,
      load,
      type,
      charge
    });
    const duePayment = await DuePayment.findOne({
      where: {
        ReservationId: ReservationId,
      },
    });
    duePayment.TotalLaundry += laundry.charge;
    duePayment.PaymentAmount = duePayment.PaymentAmount + duePayment.TotalLaundry;

    await duePayment.save();
    res.json(laundry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create laundry' });
  }
});

  
  

module.exports = router;
