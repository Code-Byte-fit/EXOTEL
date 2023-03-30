const express=require('express')
const router=express.Router()
const {UserAccounts,Users}=require('../models')
const bcrypt=require("bcrypt");
const {sign} = require('jsonwebtoken')

router.get('/',async (req,res)=>{
    const listOUserAccounts=await UserAccounts.findAll()
    res.json(listOUserAccounts)
})


router.post("/login", async (req,res) =>{
    const { userName, password} = req.body;
    // const user = await UserAccounts.findOne({ where: {userName:userName}});
    const user = await UserAccounts.findOne({
        where: { userName: userName },
        include: {
          model: Users,
          attributes: ["Role"],
        },
      });
    if (!user) return res.json({error: "User doesn't exist"});
    bcrypt.compare(password,user.password).then((match) =>{
        if(!match) return res.json({error: "Wrong username and password combination"});         
        const accessToken = sign({ userName: user.userName, userAccountId:user.userAccountId,userRole: user.User.Role}, "secret");
        res.json(accessToken);
    });
});




module.exports=router