const express=require('express')
const {Sequelize,Op} = require('sequelize');
const {Guests,Reservations}=require('../models')
const router=express.Router()


router.get('/',async (req,res)=>{
    const listOfGuests=await Guests.findAll()
    res.json(listOfGuests)
})

router.get('/feedback', async (req, res) => {
    const checkoutDate = new Date();
    const checkoutDateString = checkoutDate.toISOString().slice(0, 10);
  
    const guests = await Guests.findAll({
      include: [
        {
          model: Reservations,
          attributes: ['id', 'CheckOut'],
          where: {
            CheckOut: {
              [Op.eq]: checkoutDateString,
            },
          },
        },
      ],
    });
  
    res.json(guests);
  });
  

router.post("/",async (req,res)=>{
    const guest=req.body
    await Guests.create(guest)
    res.json(guest)
})

module.exports=router