const express = require('express')
const router = express.Router()
const { Promotion ,Reservations , RemovedPromo} = require('../models')
const { Op } = require("sequelize");
const cron = require('node-cron');



router.get('/', async (req, res) => {
  const listOfPromotions = await Promotion.findAll()
  res.json(listOfPromotions)
  console.log(listOfPromotions)
})
router.get("/:PromoCode/apply", async (req, res) => {
  const PromoCode = req.params.PromoCode;

  // try {
    const promo = await Promotion.findOne({
      where: { PromoCode: PromoCode },
      include: [
        {
          model: Reservations,
          where: {
            ReservationStatus: {
              [Op.or]: ['Checked-in', 'active']
            }
          }
        }
      ]
    });

    if (!promo) {
      return res.status(404).json({ error: 'Promo Code not found' });
    }

    const reservations = promo.Reservations.map(reservation => reservation);

    res.json({ reservations });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Failed to retrieve Promo Code reservations' });
  // }
});


router.post("/", async (req, res) => {
  try {
    const promotion = req.body;
    await Promotion.create(promotion);
    res.json(promotion);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'promoNo already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to create promotion' });
  }
});


// Update status of expired promotions
router.put('/updateExpired', async (req, res) => {
  try {
    const currentDate = new Date();
    const expiredPromotions = await Promotion.findAll({
      where: {
        Enddate: {
          [Op.lt]: currentDate,
        },
        Status: 'Active',
      },
    });
    expiredPromotions.forEach(async (promotion) => {
      promotion.Status = 'Expired';
      await promotion.save();
    });
    res.json({ message: 'Expired promotions updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update expired promotions' });
  }
});


// Schedule promotion status update every midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    const expiredPromotions = await Promotion.findAll({
      where: {
        Enddate: {
          [Op.lt]: currentDate,
        },
        Status: 'Active',
      },
    });
    expiredPromotions.forEach(async (promotion) => {
      promotion.Status = 'Expired';
      await promotion.save();
    });
    console.log('Expired promotions updated successfully');
  } catch (error) {
    console.error(error);
  }
});



router.put("/",async (req,res)=>{
  const {PromoCode,NewPromoCode, PromoType, Value, MaxUses, Status , Startdate,Enddate, AddInfo}=req.body
  
    await Promotion.update({
      PromoCode:NewPromoCode,
      PromoType:PromoType,
      Value:Value,
      MaxUses:MaxUses,
      Status:Status,
      Startdate:Startdate,
      Enddate:Enddate,
      AddInfo:AddInfo
    },{where:{PromoCode:PromoCode}})
    res.json("updated successfully")
 
  
})


// router.delete("/:PromoCode", async (req, res) => {
//   const { PromoCode } = req.params;

//   // try {
//     // Find the Add On to be removed
//     const promo = await Promotion.findOne({
//       where: { PromoCode },
    
//     });

//     if (!promo) {
//       return res.status(404).json({ error: 'Add-On not found' });
//     }

//     // Create a new removed Add On entry
//     const newRemovedPromo = await RemovedPromo.create({
//       PromoCode:promo.PromoCode,
//       PromoType:promo.PromoType,
//       Value:promo.Value,
//       MaxUses:promo.MaxUses,
//       Status:promo.Status,
//       Startdate:promo.Startdate,
//       Enddate:promo.Enddate,
//       AddInfo:promo.AddInfo 
//     });

//     // Remove the Add On from the existing tables
//     await Promotion.destroy({ where: { PromoCode } });
   
//   //   res.json({ message: 'Promotion removed successfully' });
//   // } catch (error) {
//   //   res.status(500).json({ error: 'Failed to remove Promotion' });
//   // }
// });

router.delete("/:PromoCode", async (req, res) => {
  const { PromoCode } = req.params;

  try {
    // Check if the PromoCode is associated with reservations having ReservationStatus "checked-in" or "active"
    const reservations = await Reservations.findAll({
      where: { PromoCode, ReservationStatus: ['checked-in', 'active'] }
    });

    if (reservations.length > 0) {
      return res.status(400).json({ error: 'Promotion cannot be deleted as it is associated with reservations' });
    }

    // Find the Promotion to be removed
    const promo = await Promotion.findOne({
      where: { PromoCode },
    });

    if (!promo) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    // Create a new removed Promotion entry
    const newRemovedPromo = await RemovedPromo.create({
      PromoCode: promo.PromoCode,
      PromoType: promo.PromoType,
      Value: promo.Value,
      MaxUses: promo.MaxUses,
      Status: promo.Status,
      Startdate: promo.Startdate,
      Enddate: promo.Enddate,
      AddInfo: promo.AddInfo 
    });

    // Remove the Promotion from the existing table
    await Promotion.destroy({ where: { PromoCode } });

    res.json({ message: 'Promotion removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove Promotion' });
  }
});



module.exports = router