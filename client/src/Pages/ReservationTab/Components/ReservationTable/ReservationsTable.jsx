import React, { useEffect, useState ,useContext} from 'react'
import {Link} from 'react-router-dom';
import axios from "axios"
import { AppContext } from '../../../../Helpers/AppContext';
import addIcon from "../../../../Assets/Images/Add small.png"
import Spinner from '../../../General/Spinner/Spinner';
import Table from '../../../General/Table/Table';
import ResEditDelete from './ResEditDelete';
import Filter from './Filter';
import filterIcon from "../../../../Assets/Images/mixer (2).png"
import style from "../Style.module.css"


export default function ReservationsTable(props) {
  const [reservationDetails,setReservationDetails]=useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInQuery, setCheckInQuery] = useState(new Date().toISOString().slice(0, 10));
  const [checkOutQuery, setCheckOutQuery] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const {host,authState}=useContext(AppContext)
  const [loading, setLoading] = useState(false); 
   
  useEffect(() => {
    setLoading(true);
    axios.get(`${host}/reservations`).then((response) => {
      setReservationDetails(response.data);
      setLoading(false)
    });
  }, []);


  const filteredData = reservationDetails.filter((item) => {
    let matchesFilter = true;
    for (const filter of selectedFilters) {
      if (filter.value && filter.options.length > 0) {
        matchesFilter = matchesFilter && filter.options.some(option => item[filter.value] === option.value);
      }
    }
    if (searchQuery) {
      matchesFilter = matchesFilter && item.Guest.FirstName.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (checkInQuery) {
      matchesFilter = matchesFilter && item.CheckIn.includes(checkInQuery);
    }
    if (checkOutQuery) {
      matchesFilter = matchesFilter && item.CheckOut.includes(checkOutQuery);
    }
    return matchesFilter;
  });
  


  

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
      name: 'CHARGE',
      selector: row => row.totalAmount,
      sortable: true,
    },
    {
      name: 'SOURCE',
      selector: row => row.Source,
      sortable: true,
    },
    {
      selector: row => row,
      cell: (row) => (authState.userRole==="Receptionist" ) && 
      <ResEditDelete row={row} setReservationDetails={setReservationDetails} setStats={props.setStats} setLoading={setLoading}/>
    },
];

 

return (
    <>
    {loading && <Spinner loading={loading}/>}
    <div className={style.resTableContainer}>
      <div className={style.tableHeader}>
                <div className={style.headerLeft}>
                      <span className={style.heading}>RESERVATIONS</span>
                     {(authState.userRole==="Receptionist") &&
                      <Link to="/createReservation"><img src={addIcon} className={style.addIcon}/></Link>}      
                </div>
              {reservationDetails.length>0 && <div className={style.headerRight}>
                <span className={`${!isFilterActive && style.hidden}`}>
                    <Filter  setSelectedFilters={setSelectedFilters} setSearchQuery={setSearchQuery}  setCheckInQuery={setCheckInQuery} setCheckOutQuery={setCheckOutQuery}/>
                </span>
                <img src={filterIcon} className={style.filterIcon} onClick={()=>setIsFilterActive(!isFilterActive)}/>
                </div>}
           </div>
           <div className={style.tableCont}>
            <Table columns={columns} data={filteredData} height='40vh' pagination/>           
           </div>
               
    </div>
        
    </>
  )
}

