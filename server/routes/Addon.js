const express=require('express')
const router=express.Router()
const {Addons}=require('../models')

router.get('/',async (req,res)=>{
    const listOfAddons=await Addons.findAll()
    res.json(listOfAddons)
})

router.post("/",async (req,res)=>{
    const addon=req.body
    await Addons.create(addon)
    res.json(addon)
})

module.exports=router