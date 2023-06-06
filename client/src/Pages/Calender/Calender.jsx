import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../Helpers/AppContext';
import { DayPilotScheduler } from 'daypilot-pro-react';
import randomColor from 'randomcolor';
import {ReactComponent as Arrow} from "../../Assets/Images/arrowLeft.svg"
import style from "./style.module.css"

export default function Calendar() {
  const { host } = useContext(AppContext);
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    axios.get(`${host}/rooms`).then((response) => {
      setRooms(response.data);
    });
    axios.get(`${host}/reservations/`).then((response) => {
      setReservations(response.data);
    });
  }, []);

  const handleToday = () => {
    const todayStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    setStartDate(todayStartDate.toISOString().split('T')[0]);
  };
  
  const handlePreviousMonth = () => {
    const prevMonthStartDate = new Date(startDate);
    prevMonthStartDate.setMonth(prevMonthStartDate.getMonth() - 1);
    setStartDate(prevMonthStartDate.toISOString().split('T')[0]);
  };

  const handleNextMonth = () => {
    const nextMonthStartDate = new Date(startDate);
    nextMonthStartDate.setMonth(nextMonthStartDate.getMonth() + 1);
    setStartDate(nextMonthStartDate.toISOString().split('T')[0]);
  };


  const groupedRooms = rooms.reduce((acc, room) => {
    const [roomType] = room.RoomTypeView.split("-");
    if (!acc[roomType]) {
      acc[roomType] = [];
    }
    acc[roomType].push({
      roomNumber: room.RoomNo,
      status: room.Status,
    });
    return acc;
  }, {});


  const resources = Object.entries(groupedRooms).map(([roomType, roomNumbers]) => ({
    name: roomType,
    id: roomType,
    expanded: true,
    children: roomNumbers.map((room) => {
      return(
      {
      name: room.roomNumber,
      id: room.roomNumber,
      status: room.status,
    })}),
  }));

  const events = reservations.flatMap((res) => {
    if (res.ReservationStatus === "active" || res.ReservationStatus === "Checked-In") {
      return res.Rooms.map((room) => {
        const checkOutDate = new Date(res.CheckOut); // Convert CheckOut to a Date object
        const endDate = new Date(checkOutDate.getTime() + (24 * 60 * 60 * 1000)); // Add 1 day in milliseconds
  
        return {
          text: res.Guest.FirstName,
          id: `${res.id}_${room.RoomNo}`, // Use a unique ID for each event
          start: res.CheckIn,
          end: endDate,
          resource: room.RoomNo,
        };
      });
    }
  });
  

  const config = {
    startDate: startDate,
    days: 31,
    scale: "Day",
    timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
    cellWidth: 60,
    eventHeight:40,
    heightSpec:"Parent100Pct",
    durationBarVisible: false,
    treeEnabled: true,
    eventResizeHandling: "Disabled",
    eventMoveHandling: "Disabled",
    rowHeaderColumns: [
      { name: "Room",width:2},
      { name: "Status", display: "status",width: 45 },
    ],
    onBeforeEventRender: (args) => {
      const guestName = args.data.text;
      const color = randomColor({
        luminosity: 'dark',
        format: 'hex',
        seed: guestName,
      });
      args.data.backColor = color;
      args.data.borderColor = "darker";
      args.data.fontColor = "white";

      args.data.areas = [];
      if (args.data.locked) {
        args.data.areas.push({
          right: 4,
          top: 8,
          height: 18,
          width: 18,
          symbol: "icons/daypilot.svg#padlock",
          fontColor: "white",
        });
      } else if (args.data.plus) {
        args.data.areas.push({
          right: 4,
          top: 8,
          height: 18,
          width: 18,
          symbol: "icons/daypilot.svg#plus-4",
          fontColor: "white",
        });
      }
    },
  };

  return (
    <div  className={style.mainCont}>
    <div className={style.cover}>
      <button onClick={handleToday} className={style.today}>Today</button>
      <Arrow className={style.prev} onClick={handlePreviousMonth}/>
      <Arrow className={style.next} onClick={handleNextMonth}/>
    </div>
      <DayPilotScheduler {...config} resources={resources} events={events} />
    </div>
  );
}
