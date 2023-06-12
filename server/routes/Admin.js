const express = require('express');
const router = express.Router();
const { Rooms, Promotion, Users } = require('../models');

// Define a route for getting today's statistics
router.get('/todayStats', async (req, res) => {
  try {
    // number of available rooms
    const availableRooms = await Rooms.count();

    //  number of active promotions
    const availablePromos = await Promotion.count({
      where: {
        Status: 'Active'
      }
    });

    // number of users with the role of Housekeeping Manager
    const houseKeepingManagerCount = await Users.count({
      where: {
        Role: 'HKManager'
      }
    });

    //number of users with the role of Front Office Manager
    const foManagerCount = await Users.count({
      where: {
        Role: 'FOManager'
      }
    });

    // number of users with the role of Administrator
    const adminCount = await Users.count({
      where: {
        Role: 'Administrator'
      }
    });

    //number of users with the role of Room Boy
    const roomBoyCount = await Users.count({
      where: {
        Role: 'RoomBoy'
      }
    });

    // number of users with the role of Cashier
    const cashierCount = await Users.count({
      where: {
        Role: 'Cashier'
      }
    });

    // number of users with the role of Receptionist
    const receptionistCount = await Users.count({
      where: {
        Role: 'Receptionist'
      }
    });

    //  total number of users
    const availableUsers = await Users.count();

    // Send the statistics 
    res.status(200).json({
      roomCount: availableRooms,
      promoCount: availablePromos,
      usersCount: availableUsers,
      houseKeepingManagerCount,
      foManagerCount,
      adminCount,
      roomBoyCount,
      cashierCount,
      receptionistCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/active',async (req,res)=>{
  const listOfPromotions=await Promotion.findAll({
    where:{
      Status:'active'
    }
  })
  res.json(listOfPromotions);
})

module.exports = router;
