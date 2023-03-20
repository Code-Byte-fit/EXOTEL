const express = require("express");
const router = express.Router();
const { Sequelize, Op } = require("sequelize");
const moment = require("moment");
const {
  Reservations,
  Guests,
  Rooms,
  ReservationRoom,
  CancelledReservations,
} = require("../models");

router.get("/", async (req, res) => {
  const listOfReservations = await Reservations.findAll();
  res.json(listOfReservations);
});

router.get("/", async (req, res) => {
  // const listOfReservations=await Reservations.findAll()
  // res.json(listOfReservations)
  const listOfReservations = await Reservations.findAll({
    attributes: ["id", "CheckIn", "CheckOut", "ReservationStatus", "Source"],
    include: [
      {
        model: Guests,
        attributes: ["id", "FirstName"],
      },
      {
        model: Rooms,
        attributes: ["RoomNo"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(listOfReservations);
});

router.post("/", async (req, res) => {
  try {
    const {
      CheckIn,
      CheckOut,
      CheckInTime,
      CheckOutTime,
      SelectedRooms,
      Source,
      FirstName,
      LastName,
      DOB,
      Country,
      Email,
      PhoneNumber,
      ReservationStatus,
    } = req.body;
    const guest = await Guests.create({
      FirstName,
      LastName,
      DOB,
      Country,
      Email,
      PhoneNumber,
    });
    const reservation = await Reservations.create({
      CheckIn,
      CheckOut,
      CheckInTime,
      CheckOutTime,
      Source,
      ReservationStatus,
      guestId: guest.id,
    });
    for (const roomNumber of SelectedRooms) {
      const room = await Rooms.findOne({
        where: { RoomNo: roomNumber.RoomNo },
      });
      if (room) {
        await ReservationRoom.create({
          ReservationId: reservation.id,
          RoomRoomNo: room.RoomNo,
        });
      }
    }
    res.status(201).json({ reservation, guest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

router.get("/reservationTab", async (req, res) => {
  const currentDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(currentDate.getDate() + 1);

  const todaysReservations = await Reservations.findAll({
    attributes: ["id", "CheckIn", "CheckOut", "ReservationStatus", "Source"],
    include: [
      {
        model: Guests,
        attributes: ["id", "FirstName"],
      },
      {
        model: Rooms,
        attributes: ["RoomNo"],
        through: {
          attributes: [],
        },
      },
    ],
    where: {
      CheckIn: {
        [Op.gte]: currentDate,
        [Op.lt]: tomorrowDate,
      },
    },
  });

  const tomorrowsReservations = await Reservations.findAll({
    attributes: ["id", "CheckIn", "CheckOut", "ReservationStatus", "Source"],
    include: [
      {
        model: Guests,
        attributes: ["id", "FirstName"],
      },
      {
        model: Rooms,
        attributes: ["RoomNo"],
        through: {
          attributes: [],
        },
      },
    ],
    where: {
      CheckIn: {
        [Op.between]: [
          tomorrowDate,
          new Date(tomorrowDate.getTime() + 24 * 60 * 60 * 1000),
        ],
      },
    },
  });

  const formattedTodaysReservations = todaysReservations.map((reservation) => ({
    id: reservation.id,
    guestFirstName: reservation.Guest.FirstName,
    rooms: reservation.Rooms.map((room) => room.RoomNo),
    checkIn: reservation.CheckIn,
    checkOut: reservation.CheckOut,
    reservationStatus: reservation.ReservationStatus,
    source: reservation.Source,
  }));

  const formattedTomorrowsReservations = tomorrowsReservations.map(
    (reservation) => ({
      id: reservation.id,
      guestFirstName: reservation.Guest.FirstName,
      rooms: reservation.Rooms.map((room) => room.RoomNo),
      checkIn: reservation.CheckIn,
      checkOut: reservation.CheckOut,
      reservationStatus: reservation.ReservationStatus,
      source: reservation.Source,
    })
  );

  res.json({
    todaysReservations: formattedTodaysReservations,
    tomorrowsReservations: formattedTomorrowsReservations,
  });
});

router.put("/", async (req, res) => {
  const {
    id,
    checkIn,
    checkOut,
    reservationStatus,
    source,
    guestFirstName,
    rooms,
  } = req.body;
  await Reservations.update(
    {
      CheckIn: checkIn,
      CheckOut: checkOut,
      Source: source,
      ReservationStatus: reservationStatus,
    },
    { where: { id: id } }
  );
  res.json("updated Successfully");
});

router.put("/Cancel/:resId", async (req, res) => {
  const resID = req.params.resId;
  const reservation = await Reservations.findOne({
    where: {
      id: resID,
    },
  });
  if (reservation.ReservationStatus === "active") {
    reservation.ReservationStatus = "cancelled";
    await reservation.save();

    // create a new cancelled reservation record in the CancelledReservations table
    const cancelledReservation = await CancelledReservations.create({
      reservationId: reservation.id,
    });

    res.status(200).json({
      message: "Reservation has been cancelled",
      cancelledReservation: cancelledReservation,
    });
  } else {
    res.status(400).json({
      message: "Reservation cannot be cancelled",
    });
  }
});

router.put("/Rebook/:resId", async (req, res) => {
  const resID = req.params.resId;
  const reservation = await Reservations.findOne({
    where: {
      id: resID,
    },
    include: [
      {
        model: Rooms,
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (reservation.ReservationStatus === "cancelled") {
    // Check if all rooms are available for the new reservation date range
    const roomIds = reservation.Rooms.map((room) => room.RoomNo);
    const overlappingReservations = await Reservations.findAll({
      where: {
        "$Rooms.RoomNo$": roomIds,
        ReservationStatus: "active",
        CheckIn: { [Op.lt]: reservation.CheckOut },
        CheckOut: { [Op.gt]: reservation.CheckIn },
      },
      include: [
        {
          model: Rooms,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (overlappingReservations.length > 0) {
      res.status(400).json({
        message:
          "One or more rooms are not available for the selected date range",
      });
      return;
    }

    // Set the status of the reservation to active
    reservation.ReservationStatus = "active";
    await reservation.save();
    // Delete the cancelled reservation from the CancelledReservations table
    await CancelledReservations.destroy({
      where: { reservationId: reservation.id },
    });
    res.status(200).json({ message: "Reservation has been rebooked" });
  } else {
    res.status(400).json({ message: "Reservation is not cancelled" });
  }
});

router.put("/CheckIn/:resId", async (req, res) => {
  const resID = req.params.resId;
  const reservation = await Reservations.findOne({
    where: {
      id: resID,
    },
  });
  if (reservation.ReservationStatus === "active") {
    reservation.ReservationStatus = "Checked-In";
    await reservation.save();
    res.status(200).json({
      message: "Guest Checked-In",
    });
  } else {
    res.status(400).json({
      message: "Cannot Check-In",
    });
  }
});

router.get("/todayStats", async (req, res) => {
  try {
    const today = moment().startOf("day");

    const checkins = await Reservations.count({
      where: {
        CheckIn: { [Op.eq]: today.toDate() },
        ReservationStatus: "active",
      },
    });

    const checkouts = await Reservations.count({
      where: {
        CheckOut: { [Op.eq]: today.toDate() },
        ReservationStatus: "Checked-In",
      },
    });

    const stayovers = await Reservations.count({
      where: {
        CheckIn: {
          [Op.lt]: today.toDate(),
        },
        CheckOut: {
          [Op.gt]: today.toDate(),
        },
        ReservationStatus: "Checked-In",
      },
    });

    res.status(200).json({ checkins, checkouts, stayovers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

router.get("/todayStats", async (req, res) => {
  try {
    const today = moment().startOf("day");

    const checkins = await Reservations.count({
      where: {
        CheckIn: { [Op.eq]: today.toDate() },
        ReservationStatus: "active",
      },
    });

    const checkouts = await Reservations.count({
      where: {
        CheckOut: { [Op.eq]: today.toDate() },
        ReservationStatus: "Checked-In",
      },
    });

    const stayovers = await Reservations.count({
      where: {
        CheckIn: {
          [Op.lt]: today.toDate(),
        },
        CheckOut: {
          [Op.gt]: today.toDate(),
        },
        ReservationStatus: "Checked-In",
      },
    });

    res.status(200).json({ checkins, checkouts, stayovers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
