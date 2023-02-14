import React from 'react'
import ResCalender from './Components/ResCalender'
import StatCard from './Components/StatCard'
import ReservationsTable from './Components/ReservationsTable'
import style from "./Components/Style.module.css"

export default function ReservationTab() {
  return (
    <>
        <div className={style.container}>
            <ResCalender/>
            <div className={style.cardContainer}>
                <StatCard value="14" desc="arrival"/>
                <StatCard value="14" desc="arrival"/>
                <StatCard value="14" desc="arrival"/>
                <StatCard value="14" desc="arrival"/>
            </div>
            <ReservationsTable/>
        </div>
    </>
  )
}
