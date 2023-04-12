import React,{useState} from 'react'
import axios from "axios"
import Details from './Details'
import Email from './Email'
import style from "../Style.module.css"

export default function Edit(props) {
  const handleEdit=(data)=>{
    axios.put("http://localhost:3001/guests",data).then((res)=>{
      props.setIsDone(true)
    })
  }

  const [data,setData]=useState(props.values)

  const handleStep=(newData,type,final=false)=>{
    if(final){
        handleEdit(newData)
        return
    }
    setData(prev=>({...prev,...newData}))
    if(type==="general") setCurrentView(0)
    if(type==="email") setCurrentView(1)
    if(type==="phone") setCurrentView(2)
    console.log(data)
  }

  const [currentView,setCurrentView]=useState(0)
  const views=[
    <Details values={data} handleStep={handleStep}/>,
    <Email values={data} handleStep={handleStep}/>
  ];

  return (
    <>
      <div className={style.editCont}>
          <div className={style.editHeading}>Edit Reservation</div>
          {views[currentView]}
      </div>
    </>
  )
}
