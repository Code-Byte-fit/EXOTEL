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
  const [isReBookValid, setIsReBookValid] =useState(true);

  

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

  const handleCancel = (row) => {
    axios.put(`http://localhost:3001/reservations/Cancel/${row.id}`).then(() => {
      setIsDone(true)
    });
  };


  const handleRebook = (row) => {
    axios.put(`http://localhost:3001/reservations/Rebook/${row.id}`)
      .then(() => {
        setIsDone(true);
      })
      .catch((error) => {
        console.log("error checking in")
      });
  };

  const handleRebookError=()=>{
    setIsReBookValid(true);
  }


  const handleCheckIn = (row) => {
    axios.put(`http://localhost:3001/reservations/CheckIn/${row.id}`)
      .then(() => {
        setIsDone(true);
        setIsReBookValid(true);
      })
      .catch((error) => {
        setIsReBookValid(false);
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
      cell: (row) => <EditDelete 
                      cancelOption={row.reservationStatus==="active"}
                      reBookOption={row.reservationStatus==="cancelled"} 
                      checkinOption={row.reservationStatus==="active"}
                      onEdit={() => handleEdit(row)} 
                      onCancel={()=>handleCancel(row)}  
                      onRebook={()=>handleRebook(row)}
                      onCheckIn={()=>handleCheckIn(row)}
                      isDone={isDone}
                      isReBookValid={isReBookValid}
                      handleDone={handleDone} 
                      handleReBookError={handleRebookError}
                      editComponent={<EditRes values={row}/>} 
                      cancelHeading="Confirm Cancellation"
                      cancelBody="Are you sure that you want to cancel this reservation?"
                      />
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


