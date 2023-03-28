const express=require('express')
const router=express.Router()
const {UserAccounts}=require('../models')
const bcrypt=require("bcrypt");
const {sign} = require('jsonwebtoken')

router.get('/',async (req,res)=>{
    const listOUserAccounts=await UserAccounts.findAll()
    res.json(listOUserAccounts)
})


router.post("/login", async (req,res) =>{
    const { userName, password} = req.body;
    const user = await UserAccounts.findOne({ where: {userName:userName}});
    if (!user) return res.json({error: "User doesn't exist"});
    bcrypt.compare(password,user.password).then((match) =>{
        if(!match) return res.json({error: "Wrong username and password combination"}); 
        
        const accessToken = sign({ userName: user.userName, userAccountId:user.userAccountId}, "secret");
        res.json(accessToken);
    });
});




module.exports=router