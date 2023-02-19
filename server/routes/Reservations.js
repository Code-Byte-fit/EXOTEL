const express=require('express')
const router=express.Router()
const {Sequelize} = require('sequelize');
const {Reservations,Guests,Rooms,ReservationRoom}=require('../models')


router.get('/',async (req,res)=>{
    const listOfReservations=await Reservations.findAll()
    res.json(listOfReservations)
})

router.post("/",async (req,res)=>{
    try{const{CheckIn,CheckOut,SelectedRooms,Source,ArrivalTime,FirstName,LastName,DOB,Country,Email,PhoneNumber,ReservationStatus}=req.body
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

    res.status(201).json({ reservation, guest });}
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create reservation' });
      }
})

module.exports=router