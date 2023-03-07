const express=require("express")
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors())

const db=require('./models')


//Routers
const userRouter=require('./routes/Users')
app.use("/users",userRouter);

const userAccountRouter=require('./routes/UserAccounts')
app.use("/userAccounts",userAccountRouter);

const registerRouter=require('./routes/Register')
app.use("/register",registerRouter);

const guestRouter=require('./routes/Guests')
app.use("/guests",guestRouter);

const roomRouter=require('./routes/Rooms')
app.use("/rooms",roomRouter);

const reservationRouter=require('./routes/Reservations')
app.use("/reservations",reservationRouter);

const promotionRouter=require('./routes/Promotions')
app.use("/promotions",promotionRouter);

const roomTypenRouter=require('./routes/RoomTypes')
app.use("/roomtypes",roomTypenRouter);

// const addOnRouter=require('./routes/AddOns')
// app.use("/addons",addOnRouter);




db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server running on port 3001")
    })
})





