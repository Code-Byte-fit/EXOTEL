import React, { useEffect, useState,useContext } from 'react';
import {AppContext} from "../../Helpers/AppContext"
import axios from "axios";
import Table from '../General/Table/Table';
import EditDelete  from '../General/Table/EditDelete';
import style from "./Components/Style.module.css"


export default function Users() {
  const {host}=useContext(AppContext);
  const [users,setUsers]=useState("");
  useEffect(()=>{
    axios.get(`${host}/users`).then((res)=>{
        setUsers(res.data);
    })
  },[])

  const columns = [
    {
        name: 'USER-ID',
        selector: row => row.userId,
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
      selector: row  => row.Email,
      sortable: true,
    },
    {
      name: 'PHONE-NO',
      selector: row =>row.PhoneNumber,
      sortable: true,
    },
    {
        name: 'ROLE',
        selector: row =>row.Role,
        sortable: true,
    },
    {
        name: 'USER-NAME',
        selector: row =>row.UserAccount.userName,
        sortable: true,
    },
    {
      selector: row => row,
      cell: (row) => <EditDelete/>
    },
];

  return (
    <>
        <div className={style.header}>
            <span className={style.heading}>Users</span>
            <Table columns={columns} data={users}/>
        </div>
    </>
  )
}
