import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import axios from "axios"
import addIcon from "../../../../Assets/Images/Add.png"
import Table from '../../../General/Table/Table';
import ResEditDelete from './ResEditDelete';
import Filter from './Filter';
import style from "../Style.module.css"

export default function ReservationsTable() {
  const [reservationDetails,setReservationDetails]=useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
   
  useEffect(()=>{
   axios.get("http://localhost:3001/reservations").then((response)=>{
      setReservationDetails(response.data)
    })
  },[])
  console.log(reservationDetails)

 
  const filteredData = reservationDetails.filter((item) => {
    let matchesFilter = true;
    for (const filter of selectedFilters) {
      if (filter.value && filter.options.length > 0) {
        matchesFilter = matchesFilter && filter.options.some(option => item[filter.value] === option.value);
      }
    }
    return matchesFilter;
  });

  console.log(filteredData)

  
  
 
 

  

  const columns = [
    {
        name: 'RES-ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'GUEST',
        selector: row => row.Guest.FirstName,
        sortable: true,
    },
    {
      name: 'ROOM(S)',
      selector: row => row.Rooms.map(room => room['RoomNo']).join(', '),
    },
    {
      name: 'CHECK-IN',
      selector: row => row.CheckIn,
      sortable: true,
    },
    {
      name: 'CHECK-OUT',
      selector: row => row.CheckOut,
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: row => row.ReservationStatus,
      sortable: true,
    },
    {
      name: 'SOURCE',
      selector: row => row.Source,
      sortable: true,
    },
    {
      selector: row => row,
      cell: (row) => <ResEditDelete row={row} setReservationDetails={setReservationDetails}/>
    },
];

 

return (
    <>
    <div className={style.resTableContainer}>
      <div className={style.tableHeader}>
                <div className={style.headerLeft}>
                      <span className={style.heading}>RESERVATIONS</span>
                     <Link to="/createReservation"><img src={addIcon} className={style.addIcon}/></Link> 
                     <div className={style.filter}>
                     <Filter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>
                </div>
                </div>
                <div className={style.headerRight}>
                
                </div>
           </div>
           <div className={style.tableCont}>
            <Table columns={columns} data={filteredData} height='40vh' pagination/>           
           </div>
               
    </div>
        
    </>
  )
}


