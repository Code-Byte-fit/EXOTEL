const express=require('express')
const router=express.Router()
const {Sequelize,Op} = require('sequelize');
const {RoomTypes , Reservations, Rooms, RemovedRoomTypes,ReservationRoom }=require('../models')

router.get('/',async (req,res)=>{
  const listOfRoomTypes=await RoomTypes.findAll()
  res.json(listOfRoomTypes)
})


router.get('/:RoomTypeID/allocate', async (req, res) => {
  const RoomTypeID = req.params.RoomTypeID;

  try {
    const room = await Rooms.findOne({
      where: { RoomTypeID },
      include: [
        {
          model: Reservations,
          where: {
            ReservationStatus: {
              [Op.or]: ['checked-in', 'active']
            }
          },
          attributes: [] // Exclude other attributes of Reservations model
        }
      ],
      attributes: ['RoomTypeID'] // Include only the RoomTypeID attribute
    });

    if (!room) {
      return res.status(404).json({ error: 'No allocated rooms found' });
    }

    const allocatedRoomTypeID = room.RoomTypeID;

    res.json({ allocatedRoomTypeID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve allocated RoomTypeID' });
  }
});



router.post("/", async (req, res) => {
  const { TypeName, View } = req.body;

  try {
    // Try to find an existing record with the same TypeName and View
    const existingRoomType = await RoomTypes.findOne({
      where: { TypeName, View },
    });

    if (existingRoomType) {
      // If a record with the same TypeName and View exists, return a 409 Conflict response
      res.status(409).json({ message: 'A record with the given TypeName and View already exists' });
    } else {
      // Otherwise, create a new record with the given data
      await RoomTypes.create(req.body);
      res.json({ message: 'Record created successfully' });
    }
  } catch (error) {
    // If an error occurs, manually set the RoomTypeID to the maximum existing value plus one
    const maxRoomTypeId = await RoomTypes.max('RoomTypeID');
    const roomType = {
      ...req.body,
      RoomTypeID: maxRoomTypeId ? maxRoomTypeId + 1 : 1,
    };
    await RoomTypes.create(roomType);
    res.status(500).json({ message: 'An error occurred while creating the record' });
  }
});

router.put("/",async (req,res)=>{
  const {RoomTypeID, NewTypeName,View, NoOfBeds, sqFeet, StandardCharge, AddInfo}=req.body
  
    await RoomTypes.update({
      TypeName:NewTypeName,
      View:View,
      NoOfBeds:NoOfBeds,
      sqFeet:sqFeet,
      StandardCharge:StandardCharge,
      AddInfo:AddInfo
    },{where:{RoomTypeID:RoomTypeID}})
    res.json("updated successfully")
 
  
})

router.delete("/:RoomTypeID", async (req, res) => {
  const { RoomTypeID } = req.params;

  // try {
    // Check if any reservations have associated rooms with the given room type ID and reservation statuses of "checked-in" or "active"
    const reservationsWithRooms = await Reservations.findAll({
      include: {
        model: Rooms,
        where: { RoomTypeID },
        required: true,
      },
      where: {
        ReservationStatus: ["checked-in", "active"],
      },
    });

    if (reservationsWithRooms.length > 0) {
      return res.status(400).json({
        error: "Cannot delete the room type. Reservations with active or checked-in status are associated with this room type.",
      });
    }

    // Find the room type to be removed
    const roomtype = await RoomTypes.findOne({
      where: { RoomTypeID },
    });

    if (!roomtype) {
      return res.status(404).json({ error: 'Room Type not found' });
    }

    // Create a new removed room type entry
    const newRemovedRoomTypes = await RemovedRoomTypes.create({
      TypeName: roomtype.TypeName,
      View: roomtype.View,
      NoOfBeds: roomtype.NoOfBeds,
      sqFeet: roomtype.sqFeet,
      StandardCharge: roomtype.StandardCharge,
      AddInfo: roomtype.AddInfo
    });

    // Remove the Room Types from the existing tables
    await RoomTypes.destroy({ where: { RoomTypeID } });
   
    res.json({ message: 'Room Types removed successfully' });
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to remove Room Types' });
  // }
});


module.exports=router
