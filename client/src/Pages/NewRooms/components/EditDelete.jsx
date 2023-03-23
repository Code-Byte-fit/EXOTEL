import React,{useState} from 'react'
import EditDelete from '../../General/Table/EditDelete'
import axios from 'axios';
import EditRoom from './EditRoom'

export default function REditDelete(props) {
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
          props.setlistOfRooms(response.data)
        })
      }

  return (
    <>
        <EditDelete 
            removeOption
            deleteHeading="Remove Room"
            deleteBody="Are you sure you want to remove this room?"
            onDelete={()=>{handleDelete(row)}}
            isDone={isDone}
            editComponent = { <EditRoom values = {row}/>}
        />
    </>
  )
}