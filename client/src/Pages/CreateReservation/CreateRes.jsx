import React, { useState } from 'react'
import ResPageOne from './Components/ResPageOne'
import ResPageTwo from './Components/ResPageTwo'
import Header from './Components/Common/Header'
import Selected from './Components/Common/Selected'
import AmountBar from './Components/Common/AmountBar'
import style from './Components/Common/Style.module.css'

export default function CreateRes() {
  const makeReq=(formData)=>{
    console.log("submitted",formData)
  }

    const [data,setData]=useState({
        RoomType:"",
        Package:"",
        PromoCode:"",
        CheckIn:"",
        CheckOut:"",
        Source:"",
        ArrivalTime:"",
        FirstName:"",
        LastName:"",
        DOB:"",
        Country:"",
        Email:"",
        PhoneNumber:""
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
    <ResPageTwo next={handleNextStep} prev={handlePrevStep} data={data}/>
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
        <AmountBar/>
      </div>
    </>
  )
}
