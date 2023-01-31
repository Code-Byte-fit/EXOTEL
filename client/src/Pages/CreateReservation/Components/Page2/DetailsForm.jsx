import React from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./Style.module.css"

export default function DetailsForm() {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const schema=yup.object().shape({
    FirstName:yup.string().required(),
    LastName:yup.string().required(),
    BirthDate: yup.date().typeError("please enter a valid date").required().min("1969-11-13", "Date is too early"),
    Country:yup.string().required(),
    Email:yup.string().email().required(),
    PhoneNumber: yup.string().required("required").matches(phoneRegExp, 'Phone number is not valid').min(10, "too short")
    .max(10, "too long"), })
  const {register,handleSubmit}=useForm({resolver:yupResolver(schema)})
  const onSubmit=(data)=>{
  axios.post("http://localhost:3001/guests",data).then((res)=>{
      console.log("working")
  })}
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <span className={style.sectionHeading}>RESERVATION DETAILS</span>
        <div>
            <div className={style.InputContainer}>
                <label>Source</label>
                <input type="text" className={style.Input} name="Source" {...register("Source")}/>
            </div>
            <div className={style.InputContainer}>
                <label>Arrival Time</label>
                <input type="time" className={style.Input} name="ArrivalTIme" {...register("ArrivalTIme")}/>
            </div>
        </div>

        <span className={style.sectionHeading}>MAIN GUEST</span>
        <div>
            <div className={style.InputContainer}>
                <label>First Name</label>
                <input type="text" className={style.Input} name="FirstName" {...register("FirstName")}/>
            </div>
            <div className={style.InputContainer}>
                <label>Last Name</label>
                <input type="text" className={style.Input} name="LastName" {...register("LastName")}/>
            </div>
            <div className={style.InputContainer}>
                <label>Birth Date</label>
                <input type="date" className={style.Input} name="BirthDate" {...register("BirthDate")}/>
            </div>
            <div className={style.InputContainer}>
                <label>Country</label>
                <input type="text" className={style.Input} name="Country" {...register("Country")}/>
            </div>
        </div>
        <div>
            <div className={style.InputContainer}>
                <label>Email</label>
                <input type="text" className={style.Input} name="Email" {...register("Email")}/>
            </div>
            <div className={style.InputContainer}>
                <label>Phone Number</label>
                <input type="text" className={style.Input} name="PhoneNumber" {...register("PhoneNumber")}/>
            </div>
        </div>
        <div>
        <span className={style.sectionHeading}>IDENTIFICATION</span>
       <button className='btn btn-outline-secondary' type="button">UPLOAD IDENTIFICATION</button>
       
        </div>
          <button className={`btn btn-primary`} type="submit">PROCEED</button>
    </form>
    </>
  )
}
