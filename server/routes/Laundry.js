const express = require("express");
const router = express.Router();
const {Laundry} = require ("../models");

router.get("/", async (req, res) => {
    const listOfLaundry = await Laundry.findAll();
    res.json(listOfLaundry);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Laundry.create(post);
    res.json(post);
});

module.exports = router;
