import React,{useState} from 'react'
import EditDelete from '../../../General/Table/EditDelete';
import EditRes from './EditRes';
import axios from 'axios';

export default function ResEditDelete(props) {
    const [isDone, setIsDone] = useState(false);
    const [isReBookValid, setIsReBookValid] =useState(true);
    const row=props.row;

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
        axios.get("http://localhost:3001/reservations").then((response)=>{
          props.setReservationDetails(response.data)
        })
        axios.get("http://localhost:3001/reservations/todayStats").then((response)=>{
          props.setStats(response.data)
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
                      isReBookValid={isReBookValid}
                      handleDone={handleDone} 
                      handleReBookError={handleRebookError}
                      editComponent={<EditRes values={row} setIsDone={setIsDone}/>} 
                      cancelHeading="Confirm Cancellation"
                      cancelBody="Are you sure that you want to cancel this reservation?"
                      />
    </>
  )
}
