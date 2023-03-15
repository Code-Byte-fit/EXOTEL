const express = require("express");
const router = express.Router();
const { TaskAllocation } = require("../models");

router.get("/", async (req, res) => {
  const listOfTasks = await TaskAllocation.findAll();
  res.json(listOfTasks);
});

router.post("/", async (req, res) => {
  console.log("call");
  const task = req.body;
  await TaskAllocation.create(task);
  res.json(task);
});

module.exports = router;
