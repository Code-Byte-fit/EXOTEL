const express = require("express");
// const { default: Login } = require("../../client/src/Pages/LoginPage/Login");
const router = express.Router();
const { Login } = require("../models")

router.get("/", async (req,  res)=> {
    const ListOfLogs = await Login.findAll();
    res.json(ListOfLogs);
});

router.post("/",async (req, res) => {
    const post = req.body;
    await Login.create(post);
    res.json(post);
});

module.exports = router;