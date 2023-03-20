import React,{useState} from 'react'
import EditDelete from '../../General/Table/EditDelete'
import axios from 'axios';

export default function RTEditDelete(props) {
    const [isDone, setIsDone] = useState(false);
    const row=props.row

    const handleDelete=(row)=>{
        axios.delete("http://localhost:3001/roomtypes").then(()=>{
          setIsDone(true)
        })
      }

      const handleDone=()=>{
        setIsDone(false)
        axios.get("http://localhost:3001/roomtypes").then((response)=>{
          props.setlistOfRoomTypes(response.data)
        })
      }

  return (
    <>
        <EditDelete 
            removeOption
            deleteHeading="Remove Room-Type"
            deleteBody="Are you sure you want to remove this type?"
            onDelete={()=>{handleDelete(row)}}
            isDone={isDone}
        />
    </>
  )
}
