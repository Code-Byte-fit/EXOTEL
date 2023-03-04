import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import axios from "axios"
import addIcon from "../../../Assets/Images/Add.png"
import EditDelete from '../../General/Table/EditDelete';
import Table from '../../General/Table/Table';
import style from "./Style.module.css"

export default function ReservationsTable() {
  const [reservationDetails,setReservationDetails]=useState([]);
  const [selectedDate, setSelectedDate] = useState('today');
  const [isDeleted, setIsDeleted] =useState(false);

  

  useEffect(()=>{
   axios.get("http://localhost:3001/reservations/reservationTab").then((response)=>{
      setReservationDetails(response.data)
    })
  },[])
  console.log(reservationDetails)

  const getReservationsForSelectedDate = () => {
    if (selectedDate === 'today') {
      return reservationDetails.todaysReservations;
    } else {
      return reservationDetails.tomorrowsReservations;
    }
  };

  const handleEdit=(row)=>{
    console.log(row)
  }
 
  const handleDelete = (row) => {
    axios.delete(`http://localhost:3001/reservations/${row.id}`)
      .then(() => {
        setReservationDetails(prevReservationDetails => {
          const updatedTodaysReservations = prevReservationDetails.todaysReservations.filter(reservation => reservation.id !== row.id);
          const updatedTomorrowsReservations = prevReservationDetails.tomorrowsReservations.filter(reservation => reservation.id !== row.id);
          return {
            todaysReservations: updatedTodaysReservations,
            tomorrowsReservations: updatedTomorrowsReservations
          };
        });
      })
      ;
  };
  

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
    {
      selector: row => row,
      cell: (row) => <EditDelete onEdit={() => handleEdit(row)} onDelete={()=>handleDelete(row)}/>
    },
];

 

  return (
    <>
    <div className={style.resTableContainer}>
      <div className={style.tableHeader}>
                <div className={style.headerLeft}>
                      <span className={style.heading}>RESERVATIONS</span>
                     <Link to="/createReservation"><img src={addIcon} className={style.addIcon}/></Link> 
                </div>
                <div className={style.headerRight}>
                <select
              className={`form-select ${style.select}`}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
            </select>
                </div>
           </div>
           <div className={style.tableCont}>
            <Table columns={columns} data={getReservationsForSelectedDate()} height='40vh'/> 
           </div>
               
    </div>
        
    </>
  )
}


