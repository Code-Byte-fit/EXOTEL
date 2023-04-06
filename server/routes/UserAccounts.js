const express=require('express')
const router=express.Router()
const {UserAccounts,Users}=require('../models')
const bcrypt=require("bcryptjs");
const {sign} = require('jsonwebtoken')
const {validateToken}=require("../middleware/AuthMiddleware")


router.get('/',async (req,res)=>{
    const listOUserAccounts=await UserAccounts.findAll()
    res.json(listOUserAccounts)
})

router.get("/:id",async (req,res)=>{
  const user = await UserAccounts.findOne({
    where: { userAccountId: req.params.id },
    include: {
      model: Users,
      attributes: ["FirstName","LastName","Role"],
    },
  });
  if (!user) return res.json({error: "User doesn't exist"});
  res.json(user)
})


router.post("/login", async (req,res) =>{
    const { userName, password} = req.body;
    const user = await UserAccounts.findOne({
        where: { userName: userName },
        include: {
          model: Users,
          attributes: ["FirstName","LastName","Role"],
        },
      });
    if (!user) return res.json({error: "User doesn't exist"});
    bcrypt.compare(password,user.password).then((match) =>{
        if(!match) return res.json({error: "Wrong username and password combination"});         
        const accessToken = sign({ userName: user.userName, userAccountId:user.userAccountId}, "secret");
        res.json({
          token:accessToken,
          userName: user.userName, 
          userAccountId:user.userAccountId,
          proPic:user.proPic,
          FirstName:user.User.FirstName,
          LastName:user.User.LastName,
          userRole:user.User.Role,
        });
    });
});


router.get("/auth",validateToken, (req,res)=>{
  res.json(req.user)
})




module.exports=router