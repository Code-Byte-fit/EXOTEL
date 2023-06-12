const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.static("./Assets"));
app.use(cors());

const db = require("./models");

//Routers
const userRouter = require("./routes/Users");
app.use("/users", userRouter);

const userAccountRouter = require("./routes/UserAccounts");
app.use("/userAccounts", userAccountRouter);

const registerRouter = require("./routes/Register");
app.use("/register", registerRouter);

const guestRouter = require("./routes/Guests");
app.use("/guests", guestRouter);

const roomRouter = require("./routes/Rooms");
app.use("/rooms", roomRouter);

const reservationRouter = require("./routes/Reservations");
app.use("/reservations", reservationRouter);

const promotionRouter = require("./routes/Promotions");
app.use("/promotions", promotionRouter);

const roomTypenRouter = require("./routes/RoomTypes");
app.use("/roomtypes", roomTypenRouter);

const addOnRouter = require("./routes/Addon");
app.use("/addon", addOnRouter);

const taskRouter = require("./routes/Tasks");
app.use("/tasks", taskRouter);

const roomItemRouter = require("./routes/RoomItems");
app.use("/roomItems", roomItemRouter);

const repairRequestRouter = require("./routes/Repairs");
app.use("/repairs", repairRequestRouter);

const hotelStatusRouter = require("./routes/HotelStatus");
app.use("/hotelStatus", hotelStatusRouter);

const HKManager = require("./routes/HKManager");
app.use("/hkManager", HKManager);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
