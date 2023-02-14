import React from 'react'
import {Formik,Form,Field} from "formik"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios'
import uploadIcon from "../../../../Assets/Images/Upload.png"
import style from "./Style.module.css"

export default function DetailsForm(props) {
//   const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//   const schema=yup.object().shape({
//     FirstName:yup.string().required(),
//     LastName:yup.string().required(),
//     BirthDate: yup.date().typeError("please enter a valid date").required().min("1969-11-13", "Date is too early"),
//     Country:yup.string().required(),
//     Email:yup.string().email().required(),
//     PhoneNumber: yup.string().required("required").matches(phoneRegExp, 'Phone number is not valid').min(10, "too short")
//     .max(10, "too long"), })
//   const onSubmit=(data)=>{
//   axios.post("http://localhost:3001/guests",data).then((res)=>{
//       console.log("working")
//   })}


  const handleSubmit=(values)=>{
    props.next(values)
  }

  return (
    <>
    <Formik initialValues={props.data} onSubmit={handleSubmit}>
                <Form>
                    <Field name="Country"/>
                    <Field name="Email"/>
                    <button type="button">Back</button>
                    <button type="submit">Proceed</button>
                </Form>
        
    </Formik>






































    {/* <form>
    <span className={style.sectionHeading}>RESERVATION DETAILS</span>
        <div>
            <div className={style.InputContainer}>
                <label>Source</label>
                <input type="text" className={style.Input} name="Source" {...register("Source")}/>
            </div>
            <div className={style.InputContainer}>
                <label>Arrival Time</label>
                <input type="time" className={`${style.Input} ${style.time}`} name="ArrivalTIme" {...register("ArrivalTIme")}/>
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
                <input type="date" className={`${style.Input} ${style.date} `} name="BirthDate" {...register("BirthDate")}/>
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
            <button className={style.uploadBtn} type="button">
                 <img src={uploadIcon} className={style.uploadIcon}/>
                 <span>upload identification</span>
            </button>
        </div>
          <button className={style.proceedBtn} type="submit">PROCEED</button>
    </form> */}
    </>
  )
}
