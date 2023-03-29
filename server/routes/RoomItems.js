const express = require("express");
const router = express.Router();
const { RoomItems } = require("../models");
const { Op } = require("sequelize");

// router.get("/", async (req, res) => {
//   const listOfItems = await RoomItems.findAll();
//   res.json(listOfItems);
// });

router.get("/", async (req, res) => {
  try {
    const roomItems = await RoomItems.findAll({
      //   include: [
      //     {
      //       model: RoomTypes,
      //       through: ItemRoomTypes,
      //       attributes: ["TypeName"],
      //     },
      //   ],
      attributes: [
        "RoomItemNo",
        "RoomItemName",
        "Cost",
        // [
        //   Sequelize.fn("GROUP_CONCAT", Sequelize.col("RoomTypes.TypeName")),
        //   "RoomTypes",
        // ],
      ],
      //   group: ["RoomItems.RoomItemNo"],
    });
    console.log(roomItems);
    res.json(roomItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
