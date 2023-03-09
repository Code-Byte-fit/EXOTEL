import React,{useEffect} from 'react'
import Table from "../General/Table/Table"
import EditDelete from "../General/Table/EditDelete"
import style from "./Components/Style.module.css"

export default function Reservations() {

  const columns = [
    {
        name: 'RES-ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'GUEST',
        selector: row => row.guestFirstName,
        sortable: true,
    },
    {
      name: 'ROOM(S)',
      selector: row => row.rooms.join(', '),
    },
    {
      name: 'CHECK-IN',
      selector: row => row.checkIn,
      sortable: true,
    },
    {
      name: 'CHECK-OUT',
      selector: row => row.checkOut,
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: row => row.reservationStatus,
      sortable: true,
    },
    {
      name: 'SOURCE',
      selector: row => row.source,
      sortable: true,
    },
];


  return (
    <>
    <div className={style.mainCont}>
        <span className={style.heading}>AVAILABLE RESERVATIONS</span>
        <div>
        {/* <Table height='40vh' columns={columns} data={reservations}/>  */}
        </div>
    </div> 
    </>
  )
}
