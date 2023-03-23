import React, { useEffect, useState } from 'react'
import ResCalender from './Components/ResCalender'
import StatCard from './Components/StatCard'
import ReservationsTable from './Components/ReservationTable/ReservationsTable'
import axios from 'axios'
import style from "./Components/Style.module.css"

export default function ReservationTab() {
  const [stats,setStats]=useState({});
  useEffect(()=>{
    axios.get("http://localhost:3001/reservations/todayStats").then((response)=>{
      setStats(response.data)
     })
   },[])
  
  return (
    <>
        <div className={style.container}>
            <ResCalender/>
            <div className={style.cardContainer}>
                <StatCard value={stats.checkins} desc="Arrivals"/>
                <StatCard value={stats.checkouts} desc="Departures"/>
                <StatCard value={stats.stayovers} desc="Stay-overs"/>
                <StatCard value={stats.availableRooms} desc="Rooms Available"/>
            </div>
            <ReservationsTable setStats={setStats}/>
        </div>
    </>
  )
}
