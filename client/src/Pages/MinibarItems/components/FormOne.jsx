import React from "react";
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import style from '../components/Minibar.module.css'

export default function FormOne(props) {
    const initialValues = {
      ItemName: '',
      ItemPrice: '',
      addInfo:''
    };

    const validationSchema = Yup.object().shape({
      ItemName: Yup.string().required("Required"),
      ItemPrice: Yup.number().positive("Price must be greater than 0").required("Required") ,
    });   

          return (
        <div className={style.formContainer}>
            <label className={style.labelOne}>Minibar Items </label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit} 
              validationSchema={validationSchema}>
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                 <span className={style.cont}>
                     <Field name="ItemName" 
                         component={Input} 
                         label="Item Name"
                         type="text"
                         width="20vw" />
                     <ErrorMessage name="ItemName"
                         component="span" 
                         className={style.error} 
                      />
                  </span>
                  <span className={style.cont}>
                      <Field name="ItemPrice" 
                         component={Input} 
                         label="Item Price ($)"
                         type="text"
                         width="20vw" />
                      <ErrorMessage name="ItemPrice"
                         component="span" 
                         className={style.error} 
                      />
                </span>
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
                               
