const express=require('express')
const router=express.Router()
const { Sequelize,Op } = require('sequelize');
const {Rooms,Reservations,ReservationRoom , RoomTypes}=require('../models');


router.get('/',async (req,res)=>{
  const listOfRooms=await Rooms.findAll()
  res.json(listOfRooms)
})


router.get('/availablity/:checkIn/:checkOut',async (req,res)=>{
  const checkin = req.params.checkIn;
  const checkout = req.params.checkOut;
  

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
      }
    });
    
    // retrieve the rooms associated with  reservations 
    const bookedRoomNos = reservations.map(reservation => reservation.Rooms.map(room => room.RoomNo)).flat();
    
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


  router.post("/", async (req, res) => {
    try {
      const { RoomNo, floor, View, Status, TypeName, AdditionalCharges ,  AddInfo} = req.body;
  
      // Find the room type with the given TypeName to get the standard charge
      const roomType = await RoomTypes.findOne({ where: { TypeName } });
  
      if (!roomType) {
        return res.status(404).json({ error: 'Room type not found' });
      }
  
      // Calculate the base charge by adding the additional charge and standard charge
      const BaseCharge = roomType.StandardCharge+ parseFloat(AdditionalCharges);
  
      // Create a new room with the calculated base charge
      const room = await Rooms.create({ RoomNo, floor, View, Status, TypeName, AdditionalCharges,BaseCharge ,AddInfo });
  
      res.status(201).json({ room });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create room' });
    }
  });
  









module.exports=router