const express=require('express')
const router=express.Router()
const { Sequelize,Op } = require('sequelize');
const {Rooms, Reservations}=require('../models')


router.get('/availablity/:checkIn/:checkOut',async (req,res)=>{
    const checkin = req.params.checkIn;
    const checkout = req.params.checkOut;

    try {
        const availableRooms = await Rooms.findAll({
          where: {
            Status: 'available'
          },
          include: [
            {
              model: Reservations,
              where: {
                checkIn: {
                  [Op.lte]: checkout
                },
                checkOut: {
                  [Op.gte]: checkin
                }
              },
              required: false
            }
          ],
          having: sequelize.literal('COUNT(Reservations.RoomNo) = 0')
        });
    
        res.status(200).json(availableRooms);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

module.exports=router