import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import axios from "axios"
import addIcon from "../../../Assets/Images/Add.png"
import EditDelete from '../../General/Table/EditDelete';
import EditRes from './EditRes';
import Table from '../../General/Table/Table';
import style from "./Style.module.css"

export default function ReservationsTable() {
  const [reservationDetails,setReservationDetails]=useState([]);
  const [selectedDate, setSelectedDate] = useState('today');
  const [isDone, setIsDone] = useState(false);

  

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
    axios.put("http://localhost:3001/reservations").then(()=>{
      setIsDone(true)
      
    })
  }

  const handleDelete = (row) => {
    console.log(row)
    axios.delete(`http://localhost:3001/reservations/${row.id}`).then(() => {
      setIsDone(true)
    });
  };


  const handleDone=()=>{
    setIsDone(false)
    axios.get("http://localhost:3001/reservations/reservationTab").then((response)=>{
      setReservationDetails(response.data)
    })
  }
 
 

  

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
      cell: (row) => <EditDelete onEdit={() => handleEdit(row)} onDelete={()=>handleDelete(row)}  isDone={isDone} handleDone={handleDone} editComponent={<EditRes values={row}/>}/>
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


