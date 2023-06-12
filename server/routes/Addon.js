const express = require('express');
const router = express.Router();
const { Addons } = require('../models');
const { Op } = require('sequelize');


router.get('/', async (req, res) => {
  const listOfAddons = await Addons.findAll();
  res.json(listOfAddons);
});

// Get addons equal to "laundry"
router.get('/laundry', async (req, res) => {
  try {
    const addons = await Addons.findAll({
      attributes: ['AddOn'],
      where: {
        AddOn: {
          [Op.like]: 'Laundry%'
        }
      }
    });

    res.json(addons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch laundry addons' });
  }
});


router.post('/', async (req, res) => {
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

module.exports = router;
