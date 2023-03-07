const express=require('express')
const router=express.Router()
const {RoomTypes}=require('../models')

router.get('/',async (req,res)=>{
    const listOfRoomTypes=await RoomTypes.findAll()
    res.json(listOfRoomTypes)
})

router.post("/",async (req,res)=>{
    const roomtype=req.body
    await RoomTypes.create(roomtype)
    res.json(roomtype)
})

module.exports=router