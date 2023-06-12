const express=require('express')
const router=express.Router()
const {Addons , Reservations, ReservationAddOn, RemovedAddOn}=require('../models')

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

router.delete("/:addonID", async (req, res) => {
  const { addonID } = req.params;

  try {
    // Find the Add On to be removed
    const addon = await Addons.findOne({
      where: { addonID },
    
    });

    if (!addon) {
      return res.status(404).json({ error: 'Add-On not found' });
    }

    // Create a new removed Add On entry
    const newRemovedAddOn = await RemovedAddOn.create({
      AddOn: addon.AddOn,
      Unit: addon.Unit,
      Charge: addon.Charge,
      AddInfo: addon.AddInfo,  
    });

    // Remove the Add On from the existing tables
    await Addons.destroy({ where: { addonID } });
   
    res.json({ message: 'Add On removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove Add On' });
  }
});



module.exports=router