import React from 'react'
import {Formik,Form,Field} from "formik"
import Input from "../../General/Inputs/Inputs"
import style from "./Style.module.css"

export default function EditRes(props) {
  const Status = [
    { key: 'active', value: 'active' },
    { key: 'cancelled', value: 'cancelled' },
    { key: 'expired', value: 'expired' },
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
                          <Field name="checkIn" component={Input} label="Check-In" type="date"/>
                        </span>
                        <span className={style.input}>
                          <Field name="checkOut" component={Input} label="Check-Out" type="date"/>
                        </span>
                      </div>
                      <div className={style.inputCont}>
                      <span className={style.input}>
                        <Field name="reservationStatus" component={Input} label="Status" type="select" options={Status} id="Status"/>
                      </span>
                      <span className={style.input}>
                        <Field name="source" component={Input} label="Source" type="select" options={Sources} id="source"/>
                      </span>
                      </div>
                      
                      
                      <div className={style.confirmBtnCont}>
                        <button type='button' className={`${style.editBtn} ${style.cancelBtn}`}>Cancel</button>
                        <button type='button' className={`${style.editBtn} ${style.confirmBtn}`}>Confirm</button>
                      </div>
                      </div> 
                  </Form>
                )}
      </Formik> 
            </div>
        
    </>
  )
}
