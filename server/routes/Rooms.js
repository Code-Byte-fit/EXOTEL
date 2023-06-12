const express=require('express')
const moment = require('moment');
const router=express.Router()
const { Sequelize,Op } = require('sequelize');
const {Rooms,Reservations,ReservationRoom , RoomTypes , RemovedRoom}=require('../models');



router.get('/',async (req,res)=>{
  const listOfRooms=await Rooms.findAll()
  res.json(listOfRooms)
})

router.get('/:roomNo/status', async (req, res) => {
  const roomNo = req.params.roomNo;

  try {
    const room = await Rooms.findOne({
      where: { RoomNo: roomNo },
      include: [
        {
          model: Reservations,
          where: {
            ReservationStatus: {
              [Op.or]: ['checked-in', 'active']
            }
          }
        }
      ]
    });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    

    const reservations = room.Reservations.map(reservation => reservation.ReservationStatus);

    res.json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve room reservations' });
  }
});



//get free rooms for booking
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
    
    res.json(availableRooms);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error occured while retrieving rooms' });
    }
  });



  router.post("/", async (req, res) => {
    try {
      const { RoomNo, floor, View, Status, RoomTypeView, AdditionalCharges ,  AddInfo} = req.body;

       // Split the RoomTypeView into TypeName and View
      const typeView = RoomTypeView.split('-') 
      // Find the room type with the given TypeName to get the standard charge
      const roomType = await RoomTypes.findOne({ 
        attributes:['RoomTypeID', 'StandardCharge'],
        where: { 
          TypeName: typeView[0],
          View : typeView[1]
        } 
      });

      console.log(roomType);
      
      if (!roomType) {
        return res.status(404).json({ error: 'Room type not found' });
      }
  
      // Calculate the total charge by adding the additional charge and standard charge
      const TotalCharge = roomType.StandardCharge+ parseFloat(AdditionalCharges);
  
      console.log(TotalCharge);
      console.log(roomType.StandardCharge);
      console.log(AdditionalCharges);
      // Create a new room with the calculated total charge
      const room = await Rooms.create({ RoomNo, floor, View, Status, RoomTypeView, AdditionalCharges,TotalCharge ,AddInfo,RoomTypeID:roomType.RoomTypeID });
  
      res.status(201).json({ room });
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'RoomNo already exists' });
      }
      console.error(error);
      res.status(500).json({ error: 'Failed to create room' });
    }
  });
  

  router.put("/",async (req,res)=>{
    const {NewRoomNo,RoomNo, floor, Status, RoomTypeView, AdditionalCharges ,  AddInfo}=req.body
    
      await Rooms.update({
        RoomNo:NewRoomNo,
        floor:floor,
        Status:Status,
        RoomTypeView:RoomTypeView,
        AdditionalCharges:AdditionalCharges,
        AddInfo:AddInfo
      },{where:{RoomNo:RoomNo}})
      res.json("updated successfully")
   
    
  })

  router.delete("/:RoomNo", async (req, res) => {
    const { RoomNo } = req.params;
  
    try {
      // Check if the room has any associated reservations with statuses "checked-in" or "active"
      const associatedReservations = await Reservations.findAll({
        include: {
          model: Rooms,
          where: {
            RoomNo,
          },
        },
        where: {
          ReservationStatus: ["checked-in", "active"],
        },
      });
  
      if (associatedReservations.length > 0) {
        return res.status(400).json({ error: 'Cannot delete room with associated reservations' });
      }
  
      // Find the room to be removed
      const room = await Rooms.findOne({ where: { RoomNo } });
  
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      // Create a new removed room entry
      const newRemovedRoom = await RemovedRoom.create({
        RoomNo: room.RoomNo,
        floor: room.floor,
        Status: room.Status,
        RoomTypeView: room.RoomTypeView,
        AdditionalCharges: room.AdditionalCharges,
        AddInfo: room.AddInfo,
      });
  
      // Remove the room from the existing table
      await Rooms.destroy({ where: { RoomNo } });
  
      res.json({ message: 'Room removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to remove room' });
    }
  });
  




module.exports=router