const express=require('express')
const router=express.Router()
const { Sequelize,Op } = require('sequelize');
const {Rooms}=require('../models')


router.get('/',async (req,res)=>{
    const listOfRooms=await Rooms.findAll()
    res.json(listOfRooms)
})

router.get('/availablity/:checkIn/:checkOut',async (req,res)=>{
    const checkIn = req.params.checkIn;
    const checkOut = req.params.checkOut;
   
    try {
        const availableRooms = await Rooms.findAll({
          where: {
            [Op.or]: [
              {
                checkOut: {
                  [Op.lt]: checkIn
                }
              },
              {
                checkIn: {
                  [Op.gt]: checkOut
                }
              }
            ]
          },
          order: ['RoomNo']
        });
    
        res.json(availableRooms);
      } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching the available rooms.');
      }
})


router.post("/",async (req,res)=>{
    const room=req.body
    await Rooms.create(room)
    res.json(room)
})

module.exports=router