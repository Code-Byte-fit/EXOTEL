import React,{useState} from 'react'
import EditDelete from '../../General/Table/EditDelete'
import axios from 'axios';
import EditRoom from './EditRoom'

export default function REditDelete(props) {
    const [isDone, setIsDone] = useState(false);
   

    const handleEdit=(row)=>{
      axios.put("http://localhost:3001/rooms").then(()=>{
        setIsDone(true)
        
      })
    }


    const handleCancel = (row) => {
      axios.put(`http://localhost:3001/rooms/Cancel/${row.id}`).then(() => {
        setIsDone(true)
      });
    };


    // const handleDelete=(row)=>{
    //   axios.delete("http://localhost:3001/rooms").then(()=>{
    //     setIsDone(true)
    //   })
    // }

      const handleDone=()=>{
        setIsDone(false)
        axios.get("http://localhost:3001/rooms").then((response)=>{
          props.setlistOfRooms(response.data)
        })
      }

     const row=props.row
  return (
    <>
        <EditDelete 
            removeOption
            deleteHeading="Remove Room"
            deleteBody="Are you sure you want to remove this room?"
           
            isDone={isDone}
            editComponent = { <EditRoom values = {row}/>}
           
            // onDelete={()=>handleDelete(row)}
            onEdit={() => handleEdit(row)} 
                      onCancel={()=>handleCancel(row)}  
          
            handleDone={handleDone} 
         
            cancelHeading="Confirm Cancellation"
            cancelBody="Are you sure that you want to cancel this Room Type?"
        />
    </>
  )
}