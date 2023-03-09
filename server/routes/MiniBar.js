const express = require("express");
const router = express.Router();
const {MiniBar} = require ("../models");

router.get("/", async (req, res) => {
    const listOfMinibar = await MiniBar.findAll();
    res.json(listOfMinibar);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await MiniBar.create(post);
    res.json(post);
});

module.exports = router;
