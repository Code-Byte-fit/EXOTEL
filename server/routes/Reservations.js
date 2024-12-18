const express=require('express')
const router=express.Router()
const {Sequelize,Op} = require('sequelize');
const moment = require('moment');
const upload=require('../middleware/Upload')
const {Reservations,Guests,Rooms,ReservationRoom,CancelledReservations,DuePayment}=require('../models')
const sendEmail=require('../middleware/Email')


//get all reservation details
router.get('/',async (req,res)=>{
    try{
      const listOfReservations=await Reservations.findAll({
        attributes: ['id', 'CheckIn', 'CheckOut', 'ReservationStatus', 'Source','totalAmount'],
        include: [
          {
            model: Guests,
            attributes: ['id', 'FirstName']
          },
          {
            model: Rooms,
            attributes: ['RoomNo']
          }
        ],
      });
      res.json(listOfReservations)
    }
    catch(error){
      res.status(500).json({error: "occured when retrieving reservations"})
    }
    
})

//used to create a new reservation
router.post("/:nameFile",upload('Identification'),async (req,res)=>{
    try{
      const {CheckIn,CheckOut,CheckInTime,CheckOutTime,SelectedRooms,
             Source,FirstName,LastName,DOB,Country,Email,PhoneNumber,ReservationStatus,totalAmount,PromoCode}=req.body

      const guest = await Guests.create(
        { FirstName, LastName, DOB, Country,Email,PhoneNumber,Identification:req.file.path});

       
    

    const reservation = await Reservations.create({//create new reservation record
        CheckIn,
        CheckOut,
        CheckInTime,
        CheckOutTime,
        Source,
        ReservationStatus,
        totalAmount,
        PromoCode,
        guestId: guest.id,
    });

    //create record in ReservationRoom table
    for (const roomNumber of SelectedRooms) {
        const room = await Rooms.findOne({ where: { RoomNo: roomNumber.RoomNo } });
        if (room) {
          await ReservationRoom.create({
            ReservationId: reservation.id,
            RoomRoomNo: room.RoomNo,
          });
        }
      }
      const reservationDetails = `
      <h2>Reservation Details</h2>
      <p>Guest Name:${FirstName} ${LastName}</p>
      <p>Check-in Date: ${CheckIn}</p>
      <p>Check-out Date: ${CheckOut}</p>
      <p>Check-in Time: ${CheckInTime}</p>
      <p>Check-out Time: ${CheckOutTime}</p>
      <p>Total Amount: ${totalAmount}</p>
  `;
    sendEmail(Email,reservationDetails,"Reservation Confirmed")
    res.status(201).json({ reservation ,guest});}
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create reservation' });
      }
})

//edit reservation details
router.put("/",async (req,res)=>{
  try{
  const {id,CheckIn,CheckOut,ReservationStatus,Source,guestFirstName,rooms}=req.body
  await Reservations.update({
    CheckIn:CheckIn,
    CheckOut:CheckOut,
    Source:Source,
    ReservationStatus:ReservationStatus
  },{where:{id:id}})
  res.json("updated Successfully")
}
catch(error){
  res.json(error)
}
})


//cancel resevration
router.put("/Cancel/:resId",async (req,res)=>{
  const resID=req.params.resId;
  const reservation = await Reservations.findOne({
    where:{
      id:resID,
    }});
  if(reservation.ReservationStatus==="active"){
    reservation.ReservationStatus = "cancelled";
    await reservation.save();

    // Create a new cancelled reservation record in the CancelledReservations table
    const cancelledReservation = await CancelledReservations.create({
      reservationId: reservation.id,
    });

    res.status(200).json({ 
      message: "Reservation has been cancelled",
      cancelledReservation: cancelledReservation
    });
  } else {
    res.status(400).json({ 
      message: "Reservation cannot be cancelled",
    });
  }
});


//Rebook a cancelled reservation
router.put("/Rebook/:resId", async (req, res) => {
  const resID = req.params.resId;
  const reservation = await Reservations.findOne({
    where: {
      id: resID,
    },
    include: [{
      model: Rooms,
      through: {
        attributes: []
      }
    }],
  });

  if (reservation.ReservationStatus === "cancelled") {
    // Check if all rooms are available for the new reservation date range
    const roomIds = reservation.Rooms.map(room => room.RoomNo);
    const overlappingReservations = await Reservations.findAll({
      where: {
        "$Rooms.RoomNo$": roomIds,
        ReservationStatus: "active",
        CheckIn: { [Op.lt]: reservation.CheckOut },
        CheckOut: { [Op.gt]: reservation.CheckIn },
      },
      include: [{
        model: Rooms,
        through: {
          attributes: []
        }
      }]
    });

    if (overlappingReservations.length > 0) {
      res.status(400).json({ message: "One or more rooms are not available for the selected date range" });
      return;
    }

    // Set the status of the reservation to active
    reservation.ReservationStatus = "active";
    await reservation.save();

    // Delete the cancelled reservation from the CancelledReservations table
    await CancelledReservations.destroy({ where: { reservationId: reservation.id } });
    res.status(200).json({ message: "Reservation has been rebooked" });
  } else {
    res.status(400).json({ message: "Reservation is not cancelled" });
  }
});

//Checkin a reservation
router.put("/CheckIn/:resId",async (req,res)=>{
  const resID=req.params.resId;
  const reservation = await Reservations.findOne({
    where:{
      id:resID,
    }});
  if(reservation.ReservationStatus==="active"){
    reservation.ReservationStatus = "Checked-In";
    await reservation.save();
    const payment = await DuePayment.create({
      BaseValue:reservation.totalAmount,
      TotalMinibar:0,
      TotalLaundry:0,
      TotalCompensation:0,
      PaymentAmount:reservation.totalAmount,
      ReservationId:reservation.id
    });
    res.status(200).json({ message: "Guest Checked-In",});
    } else {
    res.status(400).json({ message: "Cannot Check-In",});
  }
});


//Checkout a reservation
router.put("/CheckOut/:resId",async (req,res)=>{
  const resID=req.params.resId;
  const reservation = await Reservations.findOne({
    where:{
      id:resID,
    }});
  if(reservation.ReservationStatus==="Checked-In"){
    reservation.ReservationStatus = "Checked-Out";
    await reservation.save();
    res.status(200).json({ message: "Guest Checked-Out",});
    } else {
    res.status(400).json({ message: "Cannot Checked-Out",});
  }
});


router.get('/todayStats', async (req, res) => {
  try {
    const today = moment().startOf('day');

    //the reservation IDs for today's check-ins
    const checkinReservations = await Reservations.findAll({
      attributes: ['id'],
      where: {
        CheckIn: {[Op.eq]: today.toDate()},
        ReservationStatus: 'active',
      },
    });
    const checkinReservationIds = checkinReservations.map(r => r.id);

    //the number of rooms associated with each check-in reservation
    const roomsPerCheckin = await ReservationRoom.findAll({
      attributes: ['ReservationId', [Sequelize.fn('COUNT', Sequelize.col('RoomRoomNo')), 'count']],
      where: {
        ReservationId: {[Op.in]: checkinReservationIds},
      },
      group: ['ReservationId'],
    });

    // the total number of rooms associated with today's check-ins
    const checkinRooms = roomsPerCheckin.reduce((acc, cur) => acc + cur.dataValues.count, 0);

      //  the reservation IDs for today's check-ins
      const stayoverReservations = await Reservations.findAll({
      attributes: ['id'],
      where: {
        CheckIn: {[Op.lte]: today.toDate()},
        CheckOut: {[Op.gt]: today.toDate()},
        ReservationStatus: 'Checked-In',
      },
    });
    const stayoverReservationIds = stayoverReservations.map(r => r.id);

    // number of rooms associated with each check-in reservation
    const roomsPerStayover = await ReservationRoom.findAll({
      attributes: ['ReservationId', [Sequelize.fn('COUNT', Sequelize.col('RoomRoomNo')), 'count']],
      where: {
        ReservationId: {[Op.in]: stayoverReservationIds},
      },
      group: ['ReservationId'],
    });

    // the total number of rooms associated with today's stayovers
      const stayoverRooms = roomsPerStayover.reduce((acc, cur) => acc + cur.dataValues.count, 0);

    // Get the number of check-outs for today
    const checkouts = await Reservations.count({
      where: {
        CheckOut: {[Op.eq]: today.toDate()},
        ReservationStatus: 'Checked-In',
      },
    });


    // Calculate the number of available rooms
    const totalRooms = await Rooms.count();
    const availableRooms = totalRooms - (checkinRooms + stayoverRooms);

    res.status(200).json({checkins: checkinReservationIds.length, checkinRooms, checkouts, stayovers:stayoverReservationIds.length, availableRooms});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



    

module.exports = router;