const express = require("express");
const router = express.Router();
const { TaskAllocations, RepairRequest } = require("../models");

router.get("/taskCount", async (req, res) => {
  try {
    const taskCount = await TaskAllocations.count();

    const repairCount = await RepairRequest.count({
      where: {
        DoneStatus: "Waiting",
      },
    });

    // const availableUsers = await Users.count();
    // console.log("taskCountttt0", taskCount);
    res.status(200).json({
      taskCount,
      repairCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/repairCount", async (req, res) => {
  try {
    const repairWaitCount = await RepairRequest.count({
      where: {
        DoneStatus: "Waiting",
      },
    });

    const repairDoneCount = await RepairRequest.count({
      where: {
        DoneStatus: "Done",
      },
    });

    // const availableUsers = await Users.count();
    // console.log("taskCountttt0", repairDoneCount);
    res.status(200).json({
      repairDoneCount,
      repairWaitCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
