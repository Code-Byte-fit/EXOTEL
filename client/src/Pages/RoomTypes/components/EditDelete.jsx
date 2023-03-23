import React,{useState} from 'react'
import EditDelete from '../../General/Table/EditDelete'
import axios from 'axios';
import EditType from './EditType';

export default function RTEditDelete(props) {
    const [isDone, setIsDone] = useState(false);
    const row=props.row

    const handleDelete=(row)=>{
        axios.delete("http://localhost:3001/roomtypes").then(()=>{
          setIsDone(true)
        })
      }

      const handleEdit=(row)=>{
        axios.put("http://localhost:3001/roomtypes").then(()=>{
          setIsDone(true)
          
        })
      }

      const handleDone=()=>{
        setIsDone(false)
        axios.get("http://localhost:3001/roomtypes").then((response)=>{
          props.setlistOfRoomTypes(response.data)
        })
      }

      const handleCancel = (row) => {
        axios.put(`http://localhost:3001/roomtypes/Cancel/${row.id}`).then(() => {
          setIsDone(true)
        });
      };



  return (
    <>
        <EditDelete 
            removeOption
            deleteHeading="Remove Room-Type"
            deleteBody="Are you sure you want to remove this type?"
            onDelete={()=>handleDelete(row)}
            onEdit={() => handleEdit(row)} 
            onCancel={()=>handleCancel(row)}  
          
            handleDone={handleDone} 
            isDone={isDone}
            editComponent = { <EditType values = {row}/>}
            cancelHeading="Confirm Cancellation"
            cancelBody="Are you sure that you want to cancel this Room Type?"
        />
    </>
  )
}