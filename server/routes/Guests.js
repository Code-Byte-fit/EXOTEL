const express=require('express')
const router=express.Router()
const {Guests}=require('../models')

router.get('/',async (req,res)=>{
    const listOfGuests=await Guests.findAll()
    res.json(listOfGuests)
})

router.post("/",async (req,res)=>{
    const guest=req.body
    await Guests.create(guest)
    res.json(guest)
})


module.exports=router