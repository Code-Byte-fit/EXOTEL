import React, { useState } from 'react'
import EditDelete from '../../General/Table/EditDelete'
import axios from 'axios';
import EditType from './EditType';

export default function RTEditDelete(props) {
  const [isDone, setIsDone] = useState(false);
 



  const handleEdit = (row) => {
    axios.put("http://localhost:3001/roomtypes").then(() => {
      setIsDone(true)

    })
  }



  
  const handleDone=()=>{
    setIsDone(false)
    axios.get("http://localhost:3001/roomtypes").then((response) => {
      props.setlistOfRoomTypes(response.data)
    })
   
  }


  const handleCancel = (row) => {
    axios.put(`http://localhost:3001/roomtypes/Cancel/${row.id}`).then(() => {
      setIsDone(true)
    });
  };

  

  const handleDelete = (row) => {
    axios.put(`http://localhost:3001/roomtypes/Delete/${row.id}`).then(() => {
      setIsDone(true)
    });
  };
  const row = props.row


  return (
    <>
      <EditDelete
        removeOption

        onEdit={() => handleEdit(row)}
        onCancel={()=>handleCancel(row)}  
        onDelete={()=>handleDelete(row)}  
        handleDone={handleDone}
        isDone={isDone}
        editComponent={<EditType values={row} />}
        deleteHeading="Confirm Deletion"
        deleteBody="Are you sure you want to delete this room type"
        cancelHeading="Confirm Cancellation"
        cancelBody="Are you sure that you want to cancel this Room Type?"
      />
    </>
  )
}