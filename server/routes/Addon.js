const express=require('express')
const router=express.Router()
const {Addons , Reservations, ReservationAddOn}=require('../models')

// Get all addons
router.get('/',async (req,res)=>{
    const listOfAddons=await Addons.findAll()
    res.json(listOfAddons)
})

router.get('/:addOn/use', async (req, res) => {
  const addOn = req.params.addOn;

  try {
    const addon = await Addons.findOne({
      where: { AddOn: addOn },
      include: [
        {
          model: Reservations,
          where: {
            ReservationStatus: {
              [Op.or]: ['checked-in', 'active']
            }
          }
        }
      ]
    });

    if (!addon) {
      return res.status(404).json({ error: 'Add-On not found' });
    }
    

    const reservations = addon.Reservations.map(reservation => reservation.ReservationStatus);

    res.json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve addOn reservations' });
  }
});


// Create a new addon
router.post('/', async (req, res) => {
  try {
    const addon = req.body;
    const existingAddon = await Addons.findOne({ where: { AddOn: addon.AddOn } });

    if (existingAddon) {
      return res.status(400).json({ error: 'Addon already exists' });
    }

    await Addons.create(addon);
    res.json(addon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create addon' });
  }
});
  
  
// Update an existing addon
router.put('/', async (req, res) => {
  try {
    const { addonID, NewAddOn, Unit, Charge, AddInfo } = req.body;

    const existingAddon = await Addons.findOne({ where: { addonID: addonID } });
    if (!existingAddon) {
      return res.status(404).json({ error: 'Addon not found' });
    }

    await Addons.update(
      {
        AddOn: NewAddOn,
        Unit: Unit,
        Charge: Charge,
        AddInfo: AddInfo,
      },
      { where: { addonID: addonID } }
    );
    res.json('Addon updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update addon' });
  }
});





module.exports=router