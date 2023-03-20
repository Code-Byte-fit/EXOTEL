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
    const availableUsers = await Users.count();

    res.status(200).json({
      roomCount: availableRooms,
      promoCount: availablePromos,
      usersCount: availableUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

  