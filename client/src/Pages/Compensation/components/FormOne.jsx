import React from "react";
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import style from '../components/Compensation.module.css'

export default function FormOne(props) {
    const today = new Date();
    const initialValues = {
        resNumber: '',
        roomNumber: '',
        date: today.toISOString().slice(0, 10),
        time: '',
        compType:'',
        compValue:''

    };

    const validationSchema = Yup.object().shape({
      RoomNumber: Yup.string().required("Required"),
      Date: Yup.date().required("Required") ,
      ItemNumber: Yup.number().min(4).max(8).required("Required") ,
      Quantity:Yup.number().required("Required") 
    });
    

    const RoomNumber = [
        {key:"--None Selected--", value:""},
        {key: "1", value:"1"},  
        {key: "2", value:"2"},
        {key: "3", value:"3"},
        {key: "4", value:"4"} 
      ]
    
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
              onSubmit={props.onSubmit} >
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                     {/* <ErrorMessage name="RoomNo" component="span"/> */}
                     {/* <Field name="CompId"
                         component={Input}
                         label="Componesation ID"
                         type="text"
                         width="15vw" /> */}
                     {/* <ErrorMessage name="Date" component="span"/> */}
                     <Field name="resNumber" 
                         component={Input} 
                         label="Res Number"
                         type="text"
                         width="20vw" />
                     {/* <ErrorMessage name="ItemNumber" component="span"/> */}
                     <Field name="roomNumber"
                         component={Input}
                         label="Room Number"
                         options={RoomNumber}
                         type="select"
                         width="20vw" />
                     {/* <ErrorMessage name="Qty" component="span"/> */}
                     <Field name="date"
                         component={Input}
                         label="Date"
                         type="date"
                         width="20vw" />

                     <Field name="time"
                         component={Input}
                         label="Time"
                         type="time"
                         width="20vw" />

                 </div>

                 <div className={style.div2}>
                 <Field name="addInfo"
                         component={Input}
                         label="Additional Information"
                         type="textarea"
                         rows="4"
                         cols="75" />

                <div className={style.div4}>
                <div className={style.div5}>
                 <Field name="compType"
                         component={Input}
                         label="Damage Type"
                         options={compType}
                         type="select"
                         width="20vw" /> 
                </div>
                <div className={style.div6}>
                <Field name="compValue"
                         component={Input}
                         label="Damage Value"
                         options={compValue}
                         type="select"
                         width="25vw" />
                  </div>
                  </div>   
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
