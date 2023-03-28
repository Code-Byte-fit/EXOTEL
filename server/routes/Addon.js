const express=require('express')
const router=express.Router()
const {Addons}=require('../models')

router.get('/',async (req,res)=>{
    const listOfAddons=await Addons.findAll()
    res.json(listOfAddons)
})

router.post("/", async (req, res) => {
    try {
      const addon = req.body;
      await Addons.create(addon);
      res.json(addon);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'AddonNo already exists' });
      }
      console.error(error);
      res.status(500).json({ error: 'Failed to create addon' });
    }
  });
  

module.exports=router