const express = require('express');
const { Users, UserAccounts } = require('../models');
const bcrypt = require('bcryptjs');
const upload=require('../middleware/Upload')
const sendEmail=require('../middleware/Email')
const router = express.Router();

//register a new user
router.post('/:nameFile',upload('proPic'), async (req, res) => {
  try {
    const existingUser = await UserAccounts.findOne({ where: { userName: req.body.userName } });
    if (existingUser) {
      res.status(400).json({ message: 'Username is already taken' });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); //hash the password
      const user = await Users.create({//create user record
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Role:req.body.userGroup,
        Country: req.body.country,
        Email: req.body.email,
        PhoneNumber: req.body.phoneNumber,
      });
      const userAccount=await UserAccounts.create({//create userAccount record
        userName:req.body.userName,
        password:hashedPassword,
        proPic:req.file.path,
        userId:user.userId
      })
      const EmailContent = `
      <h2>User Account Details</h2>
      <p>User Name:${userAccount.userName}</p>
      <p>Password: ${req.body.password}</p>
  `;
      sendEmail(user.Email,EmailContent,"User Registration")
      res.json({user,userAccount}); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the user' });
  }
});

module.exports = router;