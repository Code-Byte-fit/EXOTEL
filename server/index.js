const express=require("express")
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors())

const db=require('./models')


//Routers
const userRouter=require('./routes/Users')
app.use("/users",userRouter);

const guestRouter=require('./routes/Guests')
app.use("/guests",guestRouter);

const roomRouter=require('./routes/Rooms')
app.use("/rooms",roomRouter);

const promotionRouter=require('./routes/Promotions')
app.use("/promotions",promotionRouter);




db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server running on port 3001")
    })
})





