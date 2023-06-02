const express = require("express");
const router = express.Router();
const {Compensation} = require ("../models");

router.get("/", async (req, res) => {
    const listOfCompensation = await Compensation.findAll();
    res.json(listOfCompensation);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Compensation.create(post);
    res.json(post);
});

module.exports = router;
