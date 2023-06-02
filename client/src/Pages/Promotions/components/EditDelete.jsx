import React,{useState} from 'react'
import EditDelete from '../../General/Table/EditDelete'
import axios from 'axios';
import EditPromo from './EditPromo';

export default function RTEditDelete(props) {
    const [isDone, setIsDone] = useState(false);
    const row=props.row

    const handleDelete=(row)=>{
        axios.delete("http://localhost:3001/promotions").then(()=>{
          setIsDone(true)
        })
      }

      const handleDone=()=>{
        setIsDone(false)
        axios.get("http://localhost:3001/promotions").then((response)=>{
          props.setlistOfPromotions(response.data)
        })
      }

  return (
    <>
        <EditDelete 
            removeOption
            deleteHeading="Remove Promotion"
            deleteBody="Are you sure you want to remove this Promo?"
            onDelete={()=>{handleDelete(row)}}
            isDone={isDone}
            editComponent = { <EditPromo values = {row}/>}
        />
    </>
  )
}