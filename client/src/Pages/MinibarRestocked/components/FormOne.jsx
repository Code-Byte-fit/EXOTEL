import React from "react";
import {useState,useEffect} from 'react';
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from '../components/Minibar.module.css'

export default function FormOne(props) {
  const [Reservations, setReservations] = useState([]);
  const [MiniBarItems, setMinibarItems] = useState([]);
  const today = new Date();
    const initialValues = {
        ResNumber: '',
        LastRestocked: today.toISOString().slice(0, 10),
        ItemName: '',
        Quantity: ''
    }; 

    const validationSchema = Yup.object().shape({
      ResNumber: Yup.string().required("Required"),
      ItemName: Yup.string().min(4).max(8).required("Required") ,
      Quantity:Yup.number().positive("Quantity must be greater than 1").required("Required") 
    });

    const fetchResNum = async()=>{
      const response = await axios.get("http://localhost:3001/reservations");
      setReservations(response.data);}
      useEffect(()=>{
        fetchResNum();
      },[]);

      const fetchItemName = async()=>{
        const response = await axios.get("http://localhost:3001/Minibar/minibaritems");
        
        setMinibarItems(response.data);
        console.log(response.data)
      }
      useEffect(()=>{
        fetchItemName();
        
      },[]);
    
    

      return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Minibar Restocked </label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit}
              validationSchema={validationSchema} >
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                     <span className={style.select}>
                     <div className={style.lbl4}>
                      <label className={style.lbl3} for="resNumber">Reservation Number</label><br/></div>
                      <span className={style.cont}>
                     <Field name="ResNumber"
                        render={({ field, form }) => (
                          <Select
                            {...field}
                            options={[{key:"-- None Selected -- ",value:""},...Reservations.map(Reservations=>
                              ({key:Reservations.Id,value:Reservations.Id}))]}
                            onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                            }
                            onBlur={() => form.setFieldTouched(field.name, true)}
                          />
                          )}
                    />
                    <ErrorMessage name="ResNumber"
                            component="span" 
                            className={style.error} 
                    />
                    </span>
                    </span>
                         
                     <Field name="LastRestocked" 
                         component={Input} 
                         label="Date"
                         type="date"
                         width="20vw" />

                     <span className={style.cont}>
                     <Field name="ItemName"
                          component = {Input}
                          type="select"
                          label="Item Name"
                          width='20vw'
                    options={[{key:"-- None Selected -- ",value:""}, ...MiniBarItems.map(MiniBarItems =>
                      ({key:MiniBarItems.ItemName,value:MiniBarItems.ItemName}))]}/>
                       <ErrorMessage name="ItemName"
                            component="span" 
                            className={style.error} 
                    />
                    </span>
                    <span className={style.cont}>
                     <Field name="Quantity"
                         component={Input}
                         label="Quantity"
                         type="text"
                         width="20vw" />
                          <ErrorMessage name="Quantity"
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
                               
