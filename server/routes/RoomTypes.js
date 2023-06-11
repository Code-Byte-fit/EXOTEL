const express=require('express')
const router=express.Router()
const {RoomTypes , Reservations, Rooms }=require('../models')

router.get('/',async (req,res)=>{
  const listOfRoomTypes=await RoomTypes.findAll()
  res.json(listOfRoomTypes)
})

// router.get('/:roomTypeNo/allocate', async (req, res) => {
//   const roomTypeNo = req.params.roomTypeNo;

//   try {
//     // Find a reservation with the specified roomTypeID and active, checked-in status
//     const reservation = await Reservations.findOne({
//       where: {
//         ReservationStatus: ['active', 'Checked-In'],
//       },
//       include: [
//         {
//           model: Rooms,
//           where: {
//             RoomTypeID: roomTypeNo,
//           },
//         },
//       ],
//     });

//     let allocatedRoomTypeID = null;

//     if (reservation && reservation.Rooms) {
//       allocatedRoomTypeID = reservation.Rooms.RoomTypeID;
//     }

//     res.json({ roomTypeID: allocatedRoomTypeID });
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred while fetching room reservations' });
//   }
// });

// // GET request to fetch RoomTypeID from Rooms based on ReservationStatus
// router.get('/:typeID/allocate', async (req, res) => {
//   const { typeID } = req.params;

//   try {
//     const roomType = await RoomTypes.findByPk(typeID);

//     if (!roomType) {
//       return res.status(404).json({ message: 'Room type not found' });
//     }

//     const roomTypeID = roomType.RoomTypeID;

//     const rooms = await Rooms.findAll({
//       where: {
//         RoomTypeName: roomType.TypeName,
//         ReservationStatus: ['active', 'checked-in'],
//       },
//       attributes: ['RoomNo'],
//     });

//     res.json({
//       roomTypeID,
//       rooms,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred while fetching the RoomTypeID' });
//   }
// });


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





module.exports=router
