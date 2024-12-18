import React, { useContext} from 'react'
import {AppContext} from "../../../../Helpers/AppContext"
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as yup from 'yup';
import axios from "axios"
import Input from "../../../General/Inputs/Inputs"
import moment from 'moment';
import style from "../Style.module.css"

export default function EditRes(props) {
  const {host}=useContext(AppContext)
  const handleEdit=(data,success)=>{
    success?
    axios.put(`${host}/reservations`,data).then((res)=>{
      props.setIsDone(true)
      props.setSuccess(success);
    }):
      props.setIsDone(true);
      props.setSuccess(success);
  }

  const schema = yup.object().shape({
    CheckIn: yup.date().required('required').min(moment(new Date()).startOf('day'), "invalid"),
    CheckOut: yup
      .date()
      .min(yup.ref('CheckIn'), 'Invalid')
      .required('required'),
  });
  
  
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
            <Formik initialValues={props.values} onSubmit={null} validationSchema={schema}>
                {(formik)=>(
                  <Form>
                  <div className={style.formCont}>
                  <div className={style.btnCont}>
                        <button type='button' className={style.editBtn}>Guest</button>
                        <button type='button' className={style.editBtn}>Rooms</button>
                      </div>
                      <div className={style.inputCont}>
                        <span className={style.input}>
                          <Field name="CheckIn" component={Input} label="Check-In" type="date"/>
                          <ErrorMessage name="CheckIn" component="small" className={style.dateErr}/>
                        </span>
                        <span className={style.input}>
                          <Field name="CheckOut" component={Input} label="Check-Out" type="date"/>
                          <ErrorMessage name="CheckOut" component="small" className={style.dateErr}/>
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
                        <button type='button' className={`${style.editBtn} ${style.cancelBtn}`}
                        onClick={()=>{handleEdit(formik.values,false)}}>Cancel</button>
                        <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} 
                        onClick={()=>{formik.dirty && formik.isValid && handleEdit(formik.values,true)}}>Confirm</button>
                      </div>
                      </div> 
                  </Form>
                )}
      </Formik> 
            </div>
        
    </>
  )
}