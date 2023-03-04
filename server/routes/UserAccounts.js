const express=require('express')
const router=express.Router()
const {UserAccounts}=require('../models')
const bcrypt=require("bcrypt");

router.get('/',async (req,res)=>{
    const listOUserAccounts=await UserAccounts.findAll()
    res.json(listOUserAccounts)
})

router.post("/",async (req,res)=>{
    const {userName,password}=req.body
    bcrypt.hash(password,10).then((hash)=>{
        UserAccounts.create({
            userName:userName,
            password:hash,
        })
        res.json("Success")
    })
});

module.exports=router