const express=require('express')
const router=express.Router()
const {Sequelize,Op} = require('sequelize');
const {Reservations,Guests,Rooms,ReservationRoom}=require('../models')


router.get('/',async (req,res)=>{
    const listOfReservations=await Reservations.findAll()
    res.json(listOfReservations)
})

router.post("/",async (req,res)=>{
    const{CheckIn,CheckOut,SelectedRooms,Source,ArrivalTime,FirstName,LastName,DOB,Country,Email,PhoneNumber,ReservationStatus}=req.body
    const guest = await Guests.create({ FirstName, LastName, DOB, Country, Email, PhoneNumber });
    const reservation = await Reservations.create({
        CheckIn,
        CheckOut,
        Source,
        ReservationStatus,
        guestId: guest.id,
    });
    for (const roomNumber of SelectedRooms) {
        const room = await Rooms.findOne({ where: { RoomNo: roomNumber } });
        if (room) {
          await ReservationRoom.create({
            ReservationId: reservation.id,
            RoomRoomNo: room.RoomNo,
          });
        }
      }
    res.status(201).json({ reservation, guest });
  
})

router.get('/reservationTab', async (req, res) => {
  
  const currentDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(currentDate.getDate() + 1);

  
  const todaysReservations = await Reservations.findAll({
    attributes: ['id', 'CheckIn', 'CheckOut', 'ReservationStatus', 'Source'],
    include: [
      {
        model: Guests,
        attributes: ['id', 'FirstName']
      },
      {
        model: Rooms,
        attributes: ['RoomNo'],
        through: {
          attributes: []
        }
      }
    ],
    where: {
      CheckIn: {
        [Op.gte]: currentDate,
        [Op.lt]: tomorrowDate
      }
    }
  });

  
  const tomorrowsReservations = await Reservations.findAll({
    attributes: ['id', 'CheckIn', 'CheckOut', 'ReservationStatus', 'Source'],
    include: [
      {
        model: Guests,
        attributes: ['id', 'FirstName']
      },
      {
        model: Rooms,
        attributes: ['RoomNo'],
        through: {
          attributes: []
        }
      }
    ],
    where: {
      CheckIn: {
        [Op.between]: [tomorrowDate, new Date(tomorrowDate.getTime() + 24 * 60 * 60 * 1000)]
      }
    }
  });

  const formattedTodaysReservations = todaysReservations.map(reservation => ({
    id: reservation.id,
    guestFirstName: reservation.Guest.FirstName,
    rooms: reservation.Rooms.map(room => room.RoomNo),
    checkIn: reservation.CheckIn,
    checkOut: reservation.CheckOut,
    reservationStatus: reservation.ReservationStatus,
    source: reservation.Source
  }));

  const formattedTomorrowsReservations = tomorrowsReservations.map(reservation => ({
    id: reservation.id,
    guestFirstName: reservation.Guest.FirstName,
    rooms: reservation.Rooms.map(room => room.RoomNo),
    checkIn: reservation.CheckIn,
    checkOut: reservation.CheckOut,
    reservationStatus: reservation.ReservationStatus,
    source: reservation.Source
  }));

  res.json({
    todaysReservations: formattedTodaysReservations,
    tomorrowsReservations: formattedTomorrowsReservations
  });
});


router.put("/",async (req,res)=>{
  const {id,checkIn,checkOut,reservationStatus,source,guestFirstName,rooms}=req.body
  await Reservations.update({
    CheckIn:checkIn,
    CheckOut:checkOut,
    Source:source,
    ReservationStatus:reservationStatus
  },{where:{id:id}})
  res.json("updated Successfully")
})


router.delete("/:resId",async (req,res)=>{
    const resID=req.params.resId
    await Reservations.destroy({
      where:{
        id:resID,
      },
    })
    res.json("Deleted Successfully")
})





module.exports=router