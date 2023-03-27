const express = require("express");
const router = express.Router();
const {MiniBarRestock, MiniBarItems,MinibarPackage,MItemPackage,MRestockItem} = require ("../models");

router.get("/minibarrestocks", async (req, res) => {
    const listOfMinibar = await MiniBarRestock.findAll();
    res.json(listOfMinibar);
});

router.post("/minibarrestocks", async (req, res) => {
    const post = req.body;
    await MiniBarRestock.create(post);
    res.json(post);
});

router.get("/minibaritems", async (req, res) => {
    const listOfMinibaritems = await MiniBarItems.findAll();
    res.json(listOfMinibaritems);
});

router.post("/minibaritems", async (req, res) => {
    const post = req.body;
    await MiniBarItems.create(post);
    res.json(post);
});

router.get("/minibarpackage", async (req, res) => {
    try {
      const listOfMinibarPackage = await MinibarPackage.findAll({
        include: [
          {
            model: MiniBarItems,
            through: {
              model: MItemPackage,
            },
          },
        ],
      });
      res.json(listOfMinibarPackage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to retrieve packages" });
    }
  });
  
router.post("/minibarpackage", async (req, res) => {
        const {PackageName,PackagePrice,PackageItems}=req.body;
        const package=await MinibarPackage.create({PackageName,PackagePrice})
        
        for(const item of PackageItems){
            const pacItem=await MiniBarItems.findOne({ where: { ItemName:item.value}});
            if (pacItem) {
                await MItemPackage.create({
                  MinibarPackagePackageName: package.PackageName,
                  MiniBarItemItemName: pacItem.ItemName,
                });
              }
        }
        res.status(201).json({package}); 
});

router.put('/minibar/minibarpackage/:name', async (req, res) => {
  try {
    const PackageName = req.params.name;
    const { PackagePrice } = req.body;
    const result = await MinibarPackage.update({ PackagePrice }, { where: { PackageName } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update package price' });
  }
});

  


module.exports = router;
