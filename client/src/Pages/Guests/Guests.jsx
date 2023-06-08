import React, { useState,useEffect,useContext} from 'react'
import {AppContext} from "../../Helpers/AppContext"
import axios from "axios"
import Spinner from '../General/Spinner/Spinner'
import Table from '../General/Table/Table'
import EditDelete from '../General/Table/EditDelete'
import Edit from './Components/Edit/Edit'
import Filter from './Components/Filter'
import filterIcon from "../../Assets/Images/mixer (2).png"
import style from "./Components/Style.module.css"

export default function Guests() {
  const {host,authState}=useContext(AppContext)
  const [guestList,setGuestList]=useState([]);
  const [isDone, setIsDone] = useState(false);
  const [success,setSuccess]=useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState({fname:"",lname:"",country:""});
  const [loading, setLoading] = useState(false); 

  useEffect(()=>{
    setLoading(true)
    axios.get(`${host}/guests`).then((response)=>{
      setGuestList(response.data)
      setLoading(false)
     })
   },[])

   const handleDone=()=>{
    setIsDone(false)
    setLoading(true)
    axios.get(`${host}/guests`).then((response)=>{
      setGuestList(response.data)
      setLoading(false)
    })
  }

  //obtain filtered guest data
   const filteredData = guestList.filter((item) => {
    let matchesFilter = true;
    if (searchQuery.fname) {
      matchesFilter = matchesFilter && item.FirstName.toLowerCase().includes(searchQuery.fname.toLowerCase());
    }
    if (searchQuery.lname) {
      matchesFilter = matchesFilter && item.LastName.toLowerCase().includes(searchQuery.lname.toLowerCase());
    }
    if (searchQuery.country) {
      matchesFilter = matchesFilter && item.Country.toLowerCase().includes(searchQuery.country.toLowerCase());
    }
    return matchesFilter;
  });

   const columns = [
    {
        name: 'GUEST-ID',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'FIRST-NAME',
        selector: row => row.FirstName,
        sortable: true,
    },
    {
      name: 'LAST-NAME',
      selector: row => row.LastName,
    },
    {
      name: 'COUNTRY',
      selector: row => row.Country,
      sortable: true,
    },
    {
      name: 'E-MAIL',
      selector: row  => row.GuestEmails.map(email => <div>{email['email']}</div>),
      sortable: true,
    },
    {
      name: 'PHONE-NO',
      selector: row =>row.GuestPhoneNumbers.map(number => <div>{number['phoneNumber']}</div>),
      sortable: true,
    },
    {
      selector: row => row,
      cell: (row) => <EditDelete editOption isDone={isDone} handleDone={handleDone} success={success}
      editComponent={<Edit values={row} setIsDone={setIsDone} setSuccess={setSuccess}/>}/>
    },
];

  return (
    <>
    {loading && <Spinner loading={loading}/>}
      <div className={style.header}>
        <span className={style.heading}>Guests</span>
        {guestList.length>0 && <div className={style.headerRight}>
          <span className={`${!isFilterActive && style.hidden}`}>
              <Filter setSearchQuery={setSearchQuery}/>
          </span>
          <img src={filterIcon} className={style.filterIcon} onClick={()=>setIsFilterActive(!isFilterActive)}/>
          </div>}
      </div>
      <div className={style.tableCont}>
        <Table columns={columns} data={filteredData} height="70vh" pagination/>
      </div>
    </>
  )
}
