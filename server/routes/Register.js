const express = require('express');
const { Users, UserAccounts } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Check if a user with the given username already exists in the 'UserAccounts' table
    const existingUser = await UserAccounts.findOne({ where: { userName: req.body.userName } });

    if (existingUser) {
      // A user with the given username already exists, so return an error
      res.status(400).json({ message: 'Username is already taken' });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Create a new user record in the 'Users' table
      const user = await Users.create({
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Role:req.body.userGroup,
        BirthDate: req.body.birthDate,
        Country: req.body.country,
        Email: req.body.email,
        PhoneNumber: req.body.phoneNumber,
        userAccount: {
          // Create a related record in the 'UserAccounts' table
          userName: req.body.userName,
          password: hashedPassword,
        }
      }, {
        include: [{
          model: UserAccounts, // specify the model to include
          as: 'userAccount' // specify the alias of the association
        }]
      });

      res.json(user); // return the newly created user object
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the user' });
  }
});

module.exports = router;