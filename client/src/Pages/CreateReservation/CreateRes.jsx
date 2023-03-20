import React, { useState } from 'react'
import ResPageOne from './Components/ResPageOne'
import ResPageTwo from './Components/ResPageTwo'
import ResPageThree from './Components/ResPageThree'
import Header from './Components/Common/Header'
import AmountBar from './Components/Common/AmountBar'
import axios from 'axios'
import style from './Components/Common/Style.module.css'

export default function CreateRes() {
  const makeReq=async(formData)=>{
    const response =await axios.post(`http://localhost:3001/reservations`,formData);
    console.log(response.data);
  }

    const [data,setData]=useState({
        RoomType:"",
        Package:"",
        PromoCode:"",
        CheckIn:"",
        CheckInTime:"",
        CheckOutTime:"",
        CheckOut:"",
        AvailableRooms:[],
        SelectedRooms:[],
        Source:"",
        FirstName:"",
        LastName:"",
        Country:"",
        Email:"",
        PhoneNumber:"",
        ReservationStatus:"active",
    })

    

    const [currentStep,setCurrentStep]=useState(0)

    const handleNextStep=(newData,final=false)=>{
      if(final){
          makeReq(newData)
          return
      }
      setData(prev=>({...prev,...newData}))
      setCurrentStep(prev=>prev+1)
    }


    const handlePrevStep=(newData)=>{
      setData(prev=>({...prev,...newData}))
      setCurrentStep(prev=>prev-1)
    }
    
    console.log("data",data)

    const steps=[
    <ResPageOne next={handleNextStep} data={data}/>,
    <ResPageTwo next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <ResPageThree next={handleNextStep} prev={handlePrevStep} data={data}/>
  ]


  return (
    <>
      <div className={style.container}>
        <div className={style.innerContainer}>
          <Header 
          completedOne={currentStep>=0 && true} 
          completedTwo={currentStep>=1 && true} 
          completedThree={currentStep>=2 && true}/>
          {steps[currentStep]}
        </div>
        {currentStep<2 && <AmountBar/>}
      </div>
    </>
  )
}