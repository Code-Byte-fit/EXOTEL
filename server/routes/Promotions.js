const express = require('express')
const router = express.Router()
const { Promotion ,Reservations } = require('../models')
const { Op } = require("sequelize");
const cron = require('node-cron');



router.get('/', async (req, res) => {
  const listOfPromotions = await Promotion.findAll()
  res.json(listOfPromotions)
  console.log(listOfPromotions)
})

router.get("/:PromoC/apply", async (req, res) => {
  const PromoC = req.params.PromoC;

  try {  
   
      const promo = await Reservations.findOne({
        where: { PromoCode: PromoC },
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
  

      if (!promo) {
        return res.status(404).json({ error: 'Promo Code not found' });
      }

      const reservations = room.Reservations.map(reservation => reservation.ReservationStatus);
  
      res.json({ reservations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve Promo Code reservations' });
    }
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


module.exports = router