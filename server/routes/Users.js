const express=require('express')
const router=express.Router()
const {Users,UserAccounts}=require('../models')

router.get('/',async (req,res)=>{
    try{
      const listOfUsers=await Users.findAll({
        include: [
          {
            model: UserAccounts,
            attributes: ['userName','proPic']
          }
        ],
      });
      res.json(listOfUsers)
    }
    catch(error){
      res.status(500).json({error: "occured when retrieving Users"})
    }
    
})

router.post("/",async (req,res)=>{
    const user=req.body
    await Users.create(user)
    res.json(user)
})

module.exports=router