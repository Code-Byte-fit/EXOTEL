import React from 'react'
import {Formik,Form,Field} from "formik"
import axios from "axios"
import Input from "../../../General/Inputs/Inputs"
import style from "../Style.module.css"

export default function EditRes(props) {
  const handleEdit=(data)=>{
    axios.put("http://localhost:3001/reservations",data).then((res)=>{
      props.setIsDone(true)
    })
  }
  
  const Status = [
    { key: 'active', value: 'active' },
    { key: 'cancelled', value: 'cancelled' },
    { key: 'expired', value: 'expired' },
    { key: 'Checked-In', value: 'Checked-In' },
    { key: 'Checked-Out', value: 'Checked-Out' },
]
const Sources = [
  { key: 'Phone', value: 'Phone' },
  { key: 'Walk-In', value: 'Walk-In' },
]
  return (
    <>
        <div className={style.editCont}>
          <div className={style.editHeading}>Edit Reservation</div>
            <Formik initialValues={props.values} onSubmit={null} validationSchema={null}>
                {({values})=>(
                  <Form>
                  <div className={style.formCont}>
                  <div className={style.btnCont}>
                        <button type='button' className={style.editBtn}>Guest</button>
                        <button type='button' className={style.editBtn}>Rooms</button>
                      </div>
                      <div className={style.inputCont}>
                        <span className={style.input}>
                          <Field name="CheckIn" component={Input} label="Check-In" type="date"/>
                        </span>
                        <span className={style.input}>
                          <Field name="CheckOut" component={Input} label="Check-Out" type="date"/>
                        </span>
                      </div>
                      <div className={style.inputCont}>
                      <span className={style.input}>
                        <Field name="ReservationStatus" component={Input} label="Status" type="select" options={Status} id="Status"/>
                      </span>
                      <span className={style.input}>
                        <Field name="Source" component={Input} label="Source" type="select" options={Sources} id="source"/>
                      </span>
                      </div>
                      <div className={style.confirmBtnCont}>
                        <button type='button' className={`${style.editBtn} ${style.cancelBtn}`}>Cancel</button>
                        <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} onClick={()=>{handleEdit(values)}}>Confirm</button>
                      </div>
                      </div> 
                  </Form>
                )}
      </Formik> 
            </div>
        
    </>
  )
}
