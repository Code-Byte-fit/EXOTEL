import React, { useState,useContext} from 'react'
import {AppContext} from "../../../../Helpers/AppContext"
import EditDelete from '../../../General/Table/EditDelete';

import axios from 'axios';
import EditAddon from './EditAddon';

export default function ResEditDelete(props) {
  const {host}=useContext(AppContext)
    const [isDone, setIsDone] = useState(false);
    const [success,setSuccess]=useState(true);
    const [isReBookValid, setIsReBookValid] =useState(true);
    const row=props.row;

    const handleCancel = (row) => {
        axios.put(`${host}/addon/Cancel/${row.id}`).then(() => {
          setIsDone(true)
        });
      };


    // const handleRebook = (row) => {
    //     axios.put(`${host}/reservations/Rebook/${row.id}`)
    //       .then(() => {
    //         setIsDone(true);
    //       })
    //       .catch((error) => {
    //         console.log("error checking in")
    //       });
    //   };
    
    //   const handleRebookError=()=>{
    //     setIsReBookValid(true);
    //   }

    //   const handleCheckIn = (row) => {
    //     axios.put(`${host}/reservations/CheckIn/${row.id}`)
    //       .then(() => {
    //         setIsDone(true);
    //         setIsReBookValid(true);
    //       })
    //       .catch((error) => {
    //         setIsReBookValid(false);
    //       });
    //   };

      const handleDone=()=>{
        props.setLoading(true)
        setIsDone(false)
        axios.get(`${host}/addon`).then((response)=>{
          props.setReservationDetails(response.data)
        })
      }

  return (
    <>
        <EditDelete 
                    //   cancelOption={row.ReservationStatus==="active"}
                    //   reBookOption={row.ReservationStatus==="cancelled"} 
                    //   checkinOption={row.ReservationStatus==="active"}
                      editOption
                      onCancel={()=>handleCancel(row)}  
                     
                      isDone={isDone}
                      success={success}
                   
                      handleDone={handleDone} 
                     
                      editComponent={<EditAddon values={row} setIsDone={setIsDone} setSuccess={setSuccess}/>} 
                      cancelHeading="Confirm Cancellation"
                      cancelBody="Are you sure that you want to cancel this AddOn?"
                      />
    </>
  )
}
