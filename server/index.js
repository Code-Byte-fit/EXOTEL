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




db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server running on port 3001")
    })
})





