const express=require("express")
const cors=require('cors')

const app=express();
app.use(express.json());
app.use(cors());

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

const addOnRouter=require('./routes/Addon')
app.use("/addon",addOnRouter);

const minibarRouter = require ('./routes/Minibar')
app.use("/minibar", minibarRouter);

const laundryRouter = require ('./routes/Laundry')
app.use("/laundry", laundryRouter);

const compRouter = require ('./routes/Compensation')
app.use("/compensation", compRouter);

// const minibaritemsRouter = require ('./routes/MiniBarItems')
// app.use("/minibaritems", minibaritemsRouter);

// const minibarpackageRouter = require ('./routes/MinibarPackage')
// app.use("/minibarpackage", minibarpackageRouter);
const adminRouter =require('./routes/Admin')
app.use("/admin",adminRouter);


db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server running on port 3001")
    })
})





