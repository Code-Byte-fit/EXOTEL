import React, { useEffect, useState } from 'react'
import ResPageOne from './Components/ResPageOne'
import ResPageTwo from './Components/ResPageTwo'
import ResPageThree from './Components/ResPageThree'
import Header from './Components/Common/Header'
import AmountBar from './Components/Common/AmountBar'
import axios from 'axios'
import style from './Components/Common/Style.module.css'

export default function CreateRes() {
  const [amounts,setAmounts]=useState({subTotal:0.00,discounts:0.00,GrandTotal:0.00})
  const makeReq=async(formData)=>{
    await axios.post(`http://localhost:3001/reservations/${data.FirstName+data.LastName}`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  const currentHour = new Date().getHours().toString().padStart(2, '0');
  const currentMinute = new Date().getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHour}:${currentMinute}`;

    const [data,setData]=useState({
        RoomType:"",
        Package:"",
        PromoCode:"",
        CheckIn:new Date().toISOString().slice(0, 10),
        CheckInTime:currentTime,
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
        totalAmount:0.00,
        Discounts:"",
        Identification:'',
    })


    

    const [currentStep,setCurrentStep]=useState(0)

    const handleNextStep=(newData,final=false)=>{
      if(final){
          makeReq(newData)
          return
      }
      setData(prev=>({...prev,...newData}))
      setCurrentStep(prev=>prev+1)
      console.log(data)
    }


    const handlePrevStep=(newData)=>{
      setData(prev=>({...prev,...newData}))
      setCurrentStep(prev=>prev-1)
    }
    
    console.log("data",data)

    const steps=[
    <ResPageOne next={handleNextStep} data={data} setAmounts={setAmounts} amounts={amounts}/>,
    <ResPageTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
    <ResPageThree next={handleNextStep} prev={handlePrevStep} data={data} amounts={amounts}/>
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
        {currentStep<2 && <AmountBar subTotal={amounts.subTotal} discounts={amounts.discounts} GrandTotal={amounts.GrandTotal}/>}
      </div>
    </>
  )
}