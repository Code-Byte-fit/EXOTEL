import React, { useState,useContext} from 'react'
import {AppContext} from "../../../../Helpers/AppContext"
import EditDelete from '../../../General/Table/EditDelete';
import EditRes from './EditRes';
import axios from 'axios';

export default function ResEditDelete(props) {
  const {host}=useContext(AppContext)
    const [isDone, setIsDone] = useState(false);
    const [success,setSuccess]=useState(true);
    const [isReBookValid, setIsReBookValid] =useState(true);
    const row=props.row;

    const handleCancel = (row) => {
        axios.put(`${host}/reservations/Cancel/${row.id}`).then(() => {
          setIsDone(true)
        });
      };


    const handleRebook = (row) => {
        axios.put(`${host}/reservations/Rebook/${row.id}`)
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
        axios.put(`${host}/reservations/CheckIn/${row.id}`)
          .then(() => {
            setIsDone(true);
            setIsReBookValid(true);
          })
          .catch((error) => {
            setIsReBookValid(false);
          });
      };

      const handleDone=()=>{
        props.setLoading(true)
        setIsDone(false)
        axios.get(`${host}/reservations`).then((response)=>{
          props.setReservationDetails(response.data)
        })
        axios.get(`${host}/reservations/todayStats`).then((response)=>{
          props.setStats(response.data)
          props.setLoading(false)
     })
      }

  return (
    <>
        <EditDelete 
                      cancelOption={row.ReservationStatus==="active"}
                      reBookOption={row.ReservationStatus==="cancelled"} 
                      checkinOption={row.ReservationStatus==="active"}
                      editOption
                      onCancel={()=>handleCancel(row)}  
                      onRebook={()=>handleRebook(row)}
                      onCheckIn={()=>handleCheckIn(row)}
                      isDone={isDone}
                      success={success}
                      isReBookValid={isReBookValid}
                      handleDone={handleDone} 
                      handleReBookError={handleRebookError}
                      editComponent={<EditRes values={row} setIsDone={setIsDone} setSuccess={setSuccess}/>} 
                      cancelHeading="Confirm Cancellation"
                      cancelBody="Are you sure that you want to cancel this reservation?"
                      />
    </>
  )
}
