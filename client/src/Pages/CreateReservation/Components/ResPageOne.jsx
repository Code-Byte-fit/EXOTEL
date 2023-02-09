import React, { useEffect, useState} from 'react'
import {Formik,Form,Field} from "formik"
import axios from 'axios'
import Input from "../../General/Inputs/Inputs"
import { DatePicker, Space } from 'antd';
import moment from "moment"
import style from "./Style.module.css"



export default function ResPageOne(props) {
 
  const [listOfRooms,setListOfRooms]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:3001/rooms").then((res)=>{
      setListOfRooms(res.data);
    })
  },[])

  

  const handleSubmit=(values)=>{
    props.next(values)
  }

  const { RangePicker } = DatePicker;

  const RoomTypes = [
    { key: 'None Selected', value: '' },
    { key: 'Kings', value: 'Kings' },
    { key: 'Queens', value: 'Queens' },
]

const Pacakge = [
  { key: 'None Selected', value: '' },
  { key: 'Full-Board', value: 'Full-Board' },
  { key: 'Half-Board', value: 'Half-Board' },
]

const [booking1,setBooking1]=useState(null)
const [booking2,setBooking2]=useState(null)

const filterByDate=(dates)=>{
  const checkIn = dates[0].format("YYYY-MM-DD");
  const checkOut = dates[1].format("YYYY-MM-DD");
   
  setBooking1(checkIn)
  setBooking2(checkOut)
  console.log(booking1,booking2)
  // props.data.dates.checkIn=checkIn
  // props.data.dates.checkOut=checkOut
}
 





  return (
    <>
      <Formik initialValues={props.data} onSubmit={handleSubmit} >
              {()=>(
                <Form>
                      <div className={style.container}>
                          <div className={style.topContainer}>
                                <div className={style.topLeftContainer}>
                                    <Field name="RoomType" component={Input} label="Room Type" type="select" options={RoomTypes}/>
                                    <Field name="Package" component={Input} label="Package" type="select" options={Pacakge}/>
                                    <Field name="PromoCode" component={Input} label="Promo-Code" type="text" />
                                </div>
                                <div className={style.topRightContainer}>
                                  <RangePicker onChange={filterByDate} 
                                  size="large" className={style.dateRange} format="YYYY-MM-DD" placeholder={["check-In","Check-out"]}/> 
                                  <p>{booking1}</p>
                                </div>

                          </div>
                          <button type="submit" className={style.proceedBtn}>Proceed</button>
                        </div>
              </Form>
              )}
      </Formik>    
    </>
  )
}
