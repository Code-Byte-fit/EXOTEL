import React from "react";
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import {useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import style from '../components/Laundry.module.css'

export default function LPageOne() {

    const initialValues = {
        RoomNumber: '',
        Date: '',
        ItemNumber: '',
        Quantity: ''
    };

    const validationSchema = Yup.object().shape({
      RoomNumber: Yup.string().required("Required"),
      Date: Yup.date().required("Required") ,
      ItemNumber: Yup.number().min(4).max(8).required("Required") ,
      Quantity:Yup.number().required("Required") 
    });

    const onSubmit =  (data) =>{
        console.log(data);
   }

    const RoomNumber = [
      {key:"--None Selected--", value:""},
      {key: "Room 1", value:"Room 1"},  
      {key: "Room 2", value:"Room 2"},
      {key: "Room 3", value:"Room 3"},
      {key: "Room 4", value:"Room 4"}
    ]
    useEffect(()=>{
        axios.get("http://localhost:3001/minibar").then((response)=>{
            console.log(response.data);

        })
    },[])

    return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Add Entry</label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={onSubmit} 
              validationSchema={validationSchema} >
                <Form>
                    <div className={style.div1}>
                        {/* <ErrorMessage name="RoomNo" component="span"/> */}
                        <Field name="RoomNumber"
                            component={Input}
                            label="Room Number"
                            options={RoomNumber}
                            type="select"
                            width="20vw" />
                        {/* <ErrorMessage name="Date" component="span"/> */}
                        <Field name="Date" 
                            component={Input} 
                            label="Date"
                            type="date"
                            width="20vw" />
                        {/* <ErrorMessage name="ItemNumber" component="span"/> */}
                        <Field name="ItemNumber"
                            component={Input}
                            label="Item Number"
                            type="text"
                            width="20vw" />
                        {/* <ErrorMessage name="Qty" component="span"/> */}
                        <Field name="Quantity"
                            component={Input}
                            label="Quantity"
                            type="text"
                            width="20vw" />

                    </div>

                    <div className={style.div2}>
                        <Field name="addInfo"
                            component={Input}
                            label="Additional Information"
                            type="textarea"
                            rows="4"
                            cols="155" />
                    </div>
                    <span className={style.createBtn}> 
                    <button  className={style.buttonOne}  type="submit">Create</button>
                    </span> 

                </Form>
            </Formik>
        </div>
        
    )
}
