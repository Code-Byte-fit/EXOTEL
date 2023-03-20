const express=require('express')
const router=express.Router()
const {Promotion}=require('../models')

router.get('/',async (req,res)=>{
    const listOfPromotions=await Promotion.findAll()
    res.json(listOfPromotions)
    console.log(listOfPromotions)
})

router.post("/", async (req, res) => {
    try {
      const promotion = req.body;
      await Promotion.create(promotion);
      res.json(promotion);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'promoNo already exists' });
      }
      console.error(error);
      res.status(500).json({ error: 'Failed to create promotion' });
    }
  });
  
module.exports=router