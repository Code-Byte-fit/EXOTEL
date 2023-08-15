const express = require("express");
const router = express.Router();
const sendEmail=require('../middleware/Email')
const { DuePayment, Reservations,Guests,Bill } = require("../models");

router.get("/duePayment", async (req, res) => {
  const listOfDuePayment = await DuePayment.findAll();
  res.json(listOfDuePayment);
});

router.get("/checkin/:reservationId", async (req, res) => {
  const { reservationId } = req.params;

  try {
    const reservation = await Reservations.findOne({
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

router.post("/confirm/:paymentId/", async(req,res)=>{
  const listOfDuePayment = await DuePayment.findAll({
    where:{
      PaymentID:req.params.paymentId,
    },
    include: [
      {
        model: Reservations,
        attributes: ['id', 'CheckIn','CheckOut','totalAmount'],
        include:[ {
          model: Guests,
          attributes: ['id', 'FirstName','Email']
        },]
      },
    ],
  });
  const EmailContent = `
  <h2>Bill Details</h2>
  <p>Reservation Number:${listOfDuePayment[0].ReservationId}</p>
  <p>Check in Date: ${listOfDuePayment[0].Reservation.CheckIn}</p>
  <p>Check out Date: ${listOfDuePayment[0].Reservation.CheckOut}</p>
  <p> Base Value:${listOfDuePayment[0].Reservation.totalAmount}</p>
  <p> Minibar:${listOfDuePayment[0].TotalMinibar}</p>
  <p> Laundry:${listOfDuePayment[0].TotalLaundry}</p>
`;

sendEmail(listOfDuePayment[0].Reservation.Guest.Email, EmailContent);
res.json({ listOfDuePayment });
})

router.post("/duePayment", async (req, res) => {
  const post = req.body;
  await DuePayment.create(post);
  res.json(post);
});

router.post('/confirm', async (req, res) => {
  const { reservationId, grossAmount } = req.body;

  try {
    // Create a new bill entry in the database
    const bill = await Bill.create({
      grossAmount: grossAmount,
      ReservationId: reservationId, 
    });

    res.status(200).json({ message: 'Invoice confirmed successfully', bill });
  } catch (error) {
    console.error('Error confirming invoice:', error);
    res.status(500).json({ message: 'Failed to confirm invoice' });
  }
});

module.exports = router;
