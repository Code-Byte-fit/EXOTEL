const express = require("express");
const router = express.Router();
const {MinibarPackage} = require ("../models");

router.get("/", async (req, res) => {
    const listOfMinibaritems = await MinibarPackage.findAll();
    res.json(listOfMinibaritems);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await MinibarPackage.create(post);
    res.json(post);
});

module.exports = router;
