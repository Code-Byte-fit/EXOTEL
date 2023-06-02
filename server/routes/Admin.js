const express = require('express');
const router = express.Router();
const { Rooms, Promotion, Users } = require('../models');

router.get('/todayStats', async (req, res) => {
  try {
    const availableRooms = await Rooms.count();
    // const availablePromos = await Promotion.count();
    const availablePromos = await Promotion.count({
      where: {
        Status: 'Active'
      }
    });

    const houseKeepingManagerCount = await Users.count({
      where: {
        Role: 'HKManager'
      }
    });

    const foManagerCount = await Users.count({
      where: {
        Role: 'FOManager'
      }
    });
    const adminCount = await Users.count({
      where: {
        Role: 'Administrator'
      }
    });
    const roomBoyCount = await Users.count({
      where: {
        Role: 'RoomBoy'
      }
    });

    const cashierCount = await Users.count({
      where: {
        Role: 'Cashier'
      }
    });
    const receptionistCount = await Users.count({
      where: {
        Role: 'Receiptionist'
      }
    });

    const availableUsers = await Users.count();

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

module.exports = router;
