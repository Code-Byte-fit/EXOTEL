const express=require('express')
const router=express.Router()
const {Guests,GuestEmail,GuestPhoneNumber}=require('../models')

//retireve guest records
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

  //edit guest records
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
      res.status(500).json({ error: 'Failed to edit guest' });
    }
  })


module.exports=router