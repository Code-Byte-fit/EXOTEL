import React,{useState} from 'react'
import EditDelete from '../../../General/Table/EditDelete';
import EditRes from './EditRes';
import axios from 'axios';

export default function ResEditDelete(props) {
    const [isDone, setIsDone] = useState(false);
    const [isReBookValid, setIsReBookValid] =useState(true);

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
        axios.get("http://localhost:3001/reservations").then((response)=>{
          props.setReservationDetails(response.data)
        })
      }




      const row=props.row;






  return (
    <>
        <EditDelete 
                      cancelOption={row.ReservationStatus==="active"}
                      reBookOption={row.ReservationStatus==="cancelled"} 
                      checkinOption={row.ReservationStatus==="active"}
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
    </>
  )
}
