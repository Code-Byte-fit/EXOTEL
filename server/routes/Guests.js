const express=require('express')
const {Sequelize,Op} = require('sequelize');
const router=express.Router()
const {Guests,Reservations}=require('../models')

//retireve guest records
router.get('/', async (req, res) => {
    try {
      const listOfGuests = await Guests.findAll(

      );
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