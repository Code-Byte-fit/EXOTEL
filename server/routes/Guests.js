const express=require('express')
const router=express.Router()
const {Guests,GuestEmail,GuestPhoneNumber}=require('../models')

router.get('/', async (req, res) => {
    try {
      const listOfGuests = await Guests.findAll({
        include: [GuestEmail, GuestPhoneNumber]
      });
      res.json(listOfGuests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve guests' });
    }
  });

  router.put("/",async (req,res)=>{
    const {id,FirstName,LastName,Country}=req.body
    try{
      await Guests.update({
        FirstName:FirstName,
        LastName:LastName,
        Country:Country,
      },{where:{id:id}})
      res.json("updated successfully")
    }
    catch(error){
      res.json(error)
    }
  })


module.exports=router