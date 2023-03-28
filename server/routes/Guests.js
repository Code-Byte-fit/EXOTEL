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
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve guests' });
    }
  });
  

// router.post("/",async (req,res)=>{
//     const guest=req.body
//     await Guests.create(guest)
//     res.json(guest)
// })


module.exports=router