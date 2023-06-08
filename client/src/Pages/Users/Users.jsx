import React, { useEffect, useState,useContext } from 'react';
import {AppContext} from "../../Helpers/AppContext"
import axios from "axios";
import Table from '../General/Table/Table';
import EditDelete  from '../General/Table/EditDelete';
import Edit from './Components/Edit';
import Spinner from '../General/Spinner/Spinner';
import style from "./Components/Style.module.css"


export default function Users() {
  const {host}=useContext(AppContext);
  const [success,setSuccess]=useState(true);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [users,setUsers]=useState("");
  useEffect(()=>{
    setLoading(true)
    axios.get(`${host}/users`).then((res)=>{
        setUsers(res.data);
        setLoading(false)
    })
  },[])

  const handleDone=()=>{
    setIsDone(false)
    setLoading(true)
    axios.get(`${host}/users`).then((response)=>{
      setUsers(response.data)
      setLoading(false)
    })
  }


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
      cell: (row) => <EditDelete editOption isDone={isDone} handleDone={handleDone} setIsDone={setIsDone} success={success}
                       editComponent={<Edit values={row} setIsDone={setIsDone} setSuccess={setSuccess}/>} />
    },
];

  return (
    <>
        {loading && <Spinner loading={loading}/>}
        <div className={style.header}>
            <span className={style.heading}>Users</span>
        </div>
        <Table columns={columns} data={users} height="70vh" pagination />
    </>
  )
}
