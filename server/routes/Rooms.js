const express=require('express')
const moment = require('moment');
const router=express.Router()
const { Sequelize,Op } = require('sequelize');
const {Rooms,Reservations,ReservationRoom , RoomTypes}=require('../models');


router.get('/',async (req,res)=>{
  const listOfRooms=await Rooms.findAll()
  res.json(listOfRooms)
})


router.get('/availability/:checkIn/:checkOut/:checkInTime/:checkOutTime', async (req, res) => {
  const checkin = req.params.checkIn;
  const checkout = req.params.checkOut;
  const checkinTime = req.params.checkInTime;
  const checkoutTime = req.params.checkOutTime;
  
  try {
    const reservations = await Reservations.findAll({
      include: [{
        model: Rooms,
        through: {
          model: ReservationRoom,
        }
      }],
      where: {
        checkIn: { [Op.lt]: checkout },
        checkOut: { [Op.gt]: checkin },
        ReservationStatus: { [Op.not]: 'cancelled' }, 
      }
    });
    
    // retrieve the rooms associated with  reservations 
    const bookedRoomNos = reservations.filter(reservation =>{
      const checkInConflict = reservation.CheckIn < checkout && reservation.CheckOut > checkin;
      const checkInTimeConflict = reservation.CheckIn === checkin && reservation.CheckInTime >= checkoutTime;
      const checkOutTimeConflict = reservation.CheckOut === checkout && reservation.CheckOutTime <= checkinTime;
      return checkInConflict || checkInTimeConflict || checkOutTimeConflict;
    }).map(reservation => reservation.Rooms.map(room => room.RoomNo)).flat();
    
    // retrieve all rooms that are not associated with any of the reservations
    const availableRooms = await Rooms.findAll({
      where: {
        RoomNo: { [Op.notIn]: bookedRoomNos }
      }
    });
    
    // return the available rooms to the user
    res.json(availableRooms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



  router.post("/",async (req,res)=>{
    try{const{RoomNo,floor,Status, TypeName}=req.body
    const rooms = await Rooms.create({ RoomNo, floor, Status, TypeName });
   
    res.status(201).json({ rooms });}
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create room' });
      }
})


















// router.get('/availablity/:checkIn/:checkOut',async (req,res)=>{
//     const checkIn = req.params.checkIn;
//     const checkOut = req.params.checkOut;

//     const availableRooms = await Rooms.findAll({
//       where: {
//         Status: 'available',
//         RoomNo: {
//           [Sequelize.Op.notIn]: reservedRooms
//         }
//       },
//       attributes: ['RoomNo', 'BaseCharge'],
//       include: [
//         {
//           model: Reservations,
//           required: false,
//           where: {
//             [Sequelize.Op.or]: [
//               {
//                 checkIn: {
//                   [Sequelize.Op.gte]: checkOut
//                 }
//               },
//               {
//                 checkOut: {
//                   [Sequelize.Op.lte]: checkIn
//                 }
//               }
//             ]
//           },
//           attributes: []
//         }
//       ]
//     });
   
//     try {
//         const availableRooms = await Rooms.findAll({
//           where: {
//             [Op.or]: [
//               {
//                 checkOut: {
//                   [Op.lt]: checkIn
//                 }
//               },
//               {
//                 checkIn: {
//                   [Op.gt]: checkOut
//                 }
//               }
//             ]
//           },
//           order: ['RoomNo']
//         });
    
//         res.json(availableRooms);
//       } catch (err) {
//         console.error(err);
//         res.status(500).send('An error occurred while fetching the available rooms.');
//       }
// })


// router.post("/",async (req,res)=>{
//     const room=req.body
//     await Rooms.create(room)
//     res.json(room)
// })

module.exports=router