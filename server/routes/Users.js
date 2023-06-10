const express = require("express");
const router = express.Router();
const { Users, UserAccounts } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listOfUsers = await Users.findAll({
      include: [
        {
          model: UserAccounts,
          attributes: ["userName", "proPic"],
        },
      ],
    });
    res.json(listOfUsers);
  } catch (error) {
    res.status(500).json({ error: "occured when retrieving Users" });
  }
});

router.post("/", async (req, res) => {
  const user = req.body;
  await Users.create(user);
  res.json(user);
});

router.put("/", async (req, res) => {
  const {
    userId,
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Country,
    Role,
    UserAccount: { userName },
  } = req.body;
  try {
    await Users.update(
      {
        FirstName,
        LastName,
        Role,
        Country,
        Email,
        PhoneNumber,
      },
      {
        where: { userId },
      }
    );
    await UserAccounts.update(
      {
        userName,
      },
      {
        where: { userId },
      }
    );
    res.json("updated successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to edit user" });
  }
});

module.exports = router;
