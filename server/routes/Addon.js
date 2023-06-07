const express=require('express')
const router=express.Router()
const {Addons}=require('../models')

// Get all addons
router.get('/',async (req,res)=>{
    const listOfAddons=await Addons.findAll()
    res.json(listOfAddons)
})

// Create a new addon
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
  
  
  router.put("/",async (req,res)=>{
    const {addonID,NewAddOn, Unit, Charge, AddInfo}=req.body
    
      await Addons.update({
        AddOn:NewAddOn,
        Unit:Unit,
        Charge: Charge,
        AddInfo:AddInfo
      },{where:{addonID:addonID}})
      res.json("updated successfully")
   
    
  })




module.exports=router