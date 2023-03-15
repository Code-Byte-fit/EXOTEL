<<<<<<< Updated upstream
const express=require("express")
const cors=require('cors')

const app=express();
app.use(express.json());
app.use(cors());

const db=require('./models')
=======
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
>>>>>>> Stashed changes

const db = require("./models");

//Routers
<<<<<<< Updated upstream
const userRouter=require('./routes/Users')
app.use("/users",userRouter);

const guestRouter=require('./routes/Guests')
app.use("/guests",guestRouter);

const roomRouter=require('./routes/Rooms')
app.use("/rooms",roomRouter);

const reservationRouter=require('./routes/Reservations')
app.use("/reservations",reservationRouter);

const minibarRouter = require ('./routes/Minibar')
app.use("/minibar", minibarRouter);


db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server running on port 3001")
    })
})

=======
const userRouter = require("./routes/Users");
app.use("/users", userRouter);
>>>>>>> Stashed changes

const guestRouter = require("./routes/Guests");
app.use("/guests", guestRouter);

const roomRouter = require("./routes/Rooms");
app.use("/rooms", roomRouter);

const tasksRouter = require("./routes/Tasks");
app.use("/tasks", tasksRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
