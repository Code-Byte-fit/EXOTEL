import React, { useEffect, useState } from 'react'
import axios from "axios"
import Table from '../General/Table/Table'
import EditDelete from '../General/Table/EditDelete'
import style from "./Components/Style.module.css"

export default function Guests() {
  const [guestList,setGuestList]=useState('');

  useEffect(()=>{
    axios.get("http://localhost:3001/guests").then((response)=>{
      setGuestList(response.data)
      console.log(guestList)
     })
   },[])

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
      selector: row => row.Email,
      sortable: true,
    },
    {
      name: 'PHONE-NO',
      selector: row => row.PhoneNumber,
      sortable: true,
    }
];

  return (
    <>
       <span className={style.heading}>Guests</span>
      <div className={style.tableCont}>
        <Table columns={columns} data={guestList} height="70vh" pagination/>
      </div>
    </>
  )
}
