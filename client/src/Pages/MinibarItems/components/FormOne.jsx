import React from "react";
import {useState,useEffect} from 'react';
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from '../components/Minibar.module.css'

export default function FormOne(props) {
  const today = new Date();
    const initialValues = {
      ItemId:'',
      ItemName: '',
      Volume: '',
      ItemPrice: '',
    };

    // const validationSchema = Yup.object().shape({
    //   RoomNumber: Yup.string().required("Required"),
    //   Date: Yup.date().required("Required") ,
    //   ItemNumber: Yup.number().min(4).max(8).required("Required") ,
    //   Quantity:Yup.number().required("Required") 
    // });
     
          return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Minibar Items </label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit} >
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                      <Field name="ItemId" 
                         component={Input} 
                         label="Item Id"
                         type="text"
                         width="20vw" />

                     <Field name="ItemName" 
                         component={Input} 
                         label="Item Name"
                         type="text"
                         width="20vw" />

                      <Field name="Volume"
                         component={Input}
                         label="Volume (ml/mg)"
                         type="text"
                         width="20vw" />

                      <Field name="ItemPrice" 
                         component={Input} 
                         label="Item Price ($)"
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
                 <button type="submit" className={style.buttonOne}>Create</button>
                 </span>

             </Form>
                )}
      </Formik>

        
        </div>
        
    ) 
  }
                               
