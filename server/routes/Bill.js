const express = require("express");
const router = express.Router();
const { Reservations, MiniBarRestock, Bill } = require("../models");

router.get("/reservation/:id", async (req, res) => {
  const reservationId = req.params.id;

  try {
    // Find the reservation
    const reservation = await Reservations.findOne({
      where: { id: reservationId },
      include: [
        {
          model: MiniBarRestock,
          attributes: ["Amount"],
        },
        {
          model: Bill,
          attributes: ["grossAmount"],
        },
      ],
    });

    // Calculate the total minibar restock amount
    let minibarRestockAmount = 0;
    if (reservation.MiniBarRestocks.length > 0) {
      minibarRestockAmount = reservation.MiniBarRestocks.reduce(
        (total, restock) => total + restock.Amount,
        0
      );
    }

    // Add the minibar restock amount to the reservation's total amount
    const totalAmount = parseFloat(reservation.Bill.grossAmount) + minibarRestockAmount;

    res.json({ totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve reservation" });
  }
});



// Add data to the "Bills" table
router.post('/bill', async (req, res) => {
  try {
    const { billNumber, grossAmount, employeeId, id } = req.body;

    // Create a new bill record
    const newBill = await Bill.create({
      billNumber,
      grossAmount,
      employeeId,
      id
    });

    res.status(201).json(newBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
