const express=require('express')
const router=express.Router()
const {Users,UserAccounts,RemovedUsers,RemovedUserAccounts}=require('../models')

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

router.put("/",async (req,res)=>{
  const {userId,FirstName,LastName,Email,PhoneNumber,Country,Role,UserAccount: { userName }}=req.body
  try{
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
    res.json("updated successfully")
  }
  catch(error){
    res.status(500).json({ error: 'Failed to edit user' });
  }
})

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user to be removed
    const user = await Users.findOne({
      where: { userId },
      include: [UserAccounts],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new removed user entry
    const removedUser = await RemovedUsers.create({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Role: user.Role,
      Country: user.Country,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
    });

    // Create a new removed user account entry
    const removedUserAccount = await RemovedUserAccounts.create({
      userName: user.UserAccount.userName,
      password: user.UserAccount.password,
      proPic: user.UserAccount.proPic,
      userId:removedUser.userId
    });

    // Remove the user and user account from the existing tables
    await UserAccounts.destroy({ where: { userId } });
    await Users.destroy({ where: { userId } });

    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove user' });
  }
});




module.exports=router