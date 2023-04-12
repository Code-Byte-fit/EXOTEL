import React from "react";
import {useState,useEffect} from 'react';
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from '../components/Compensation.module.css'

export default function FormOne(props) {
  const [Reservations, setReservations] = useState([]);

    const today = new Date();
    const initialValues = {
        resNumber: '',
        date: today.toISOString().slice(0, 10),
        time: '',
        compType:'',
        compValue:''

    };

    const validationSchema = Yup.object().shape({
      resNumber: Yup.number().required("Required"),
      time: Yup.string().required("Required") ,
      compValue:Yup.string().required("Required") ,
      compType:Yup.string().required("Required") 
    });
    

    const fetchResNum = async()=>{
      const response = await axios.get("http://localhost:3001/reservations");
      setReservations(response.data);}
      useEffect(()=>{
        fetchResNum();
      },[]);
    
    const compType = [
        {key:"--None Selected--", value:""},
        {key: "Broken furniture", value:"Broken furniture"},  
        {key: "Stains damages to  bedding or linen", value:"Stains damages to  bedding or linen"},
        {key: "Damage to walls or floor", value:"Damage to walls or floor"},
        {key: "Broken electronics or appliances", value:"Broken electronics or appliances"},
        {key: "Plumbing damage", value:"Plumbing damage"},
        {key: "Smoke damage", value:"Smoke damage"}
      ]

    const compValue = [
        {key:"--None Selected--", value:""},
        {key: "Low", value:"Low"},  
        {key: "Medium", value:"Medium"},
        {key: "High", value:"High"}
      ]

      return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Compensation Charges</label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit}
              validationSchema={validationSchema} >
                {({values})=>(
                 <Form>
                 <div className={style.div1}>                
                     <span className={style.select}>
                     <div className={style.lbl4}>
                     <label className={style.lbl3} for="ResNumber">Reservation Number</label><br/></div>
                      <span className={style.cont}>
                     <Field name="ResNumber"
                     width="15vw"
                        render={({ field, form }) => (
                          <><Select
                            {...field}
                            options={[{ key: "-- None Selected -- ", value: "" }, ...Reservations.map
                            (Reservations => ({ key: Reservations.resId, value: Reservations.resId }))]}
                            onChange={(option) => form.setFieldValue(field.name, option.value)}
                            onBlur={() => form.setFieldTouched(field.name, true)} />
                            <ErrorMessage name="resNumber"
                            component="span" 
                            className={style.error} 
                            /></>
                          )} 
                    /> 
                    </span>
                    </span>                   
                     <Field name="date"
                         component={Input}
                         label="Date"
                         type="date"
                         width="13vw" />
                         
                    <span className={style.cont}>
                     <Field name="time"
                         component={Input}
                         label="Time"
                         type="time"
                         width="13vw" />
                         <ErrorMessage name="time" 
                        component="span" 
                        className={style.error} />
                      </span>

                     <span className={style.cont}>
                      <Field name="compValue"
                         component={Input}
                         label="Damage Value"
                         options={compValue}
                         type="select"
                         width="25vw" />
                         <ErrorMessage name="compValue" 
                        component="span" 
                        className={style.error} />
                    </span>
                         
                    <span className={style.cont}>
                     <Field name="compType"
                         component={Input}
                         label="Damage Type"
                         options={compType}
                         type="select"
                         width="13vw" /> 
                         <ErrorMessage name="compType" 
                        component="span" 
                        className={style.error} />
                    </span>
                 </div>

                 <div className={style.div2}>
                 <Field name="addInfo"
                         component={Input}
                         label="Additional Information"
                         type="textarea"
                         rows="4"
                         cols="152" />
                 </div>
                 <span className={style.createBtn}> 
                 <button type="submit" className={style.buttonOne}>Create</button>
                 </span>

             </Form>
                )}
      </Formik>

        
        </div>
        
    )
}
