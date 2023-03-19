const express=require('express')
const router=express.Router()
const {Promotion}=require('../models')

router.get('/',async (req,res)=>{
    const listOfPromotions=await Promotion.findAll()
    res.json(listOfPromotions)
    console.log(listOfPromotions)
})

router.post("/",async (req,res)=>{
    const promotion=req.body
    await Promotion.create(promotion)
    res.json(promotion)
})

module.exports=router