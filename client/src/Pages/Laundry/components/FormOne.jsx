import React from "react";
import {useState,useEffect} from 'react';
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import "./Laundry.css";
import style from '../components/Laundry.module.css'

export default function FormOne(props) {
    const [Reservations, setReservations] = useState([]);
    const [LaundryType, setLaundryType]=useState([]);

    const today = new Date();
    const initialValues = {
        ReservationId: '',
        receivedDate: today.toISOString().slice(0, 10),
        returnDate: '',
        load: '',
        type: ''
    };

    const validationSchema = Yup.object().shape({
      ReservationId: Yup.string().required("Required"),
      returnDate: Yup.date().required("Required") ,
      load:Yup.number().required("Required") ,
      type:Yup.string().required("Required")
    });

    const fetchResNum = async()=>{
        const response = await axios.get("http://localhost:3001/reservations");
        setReservations(response.data.map(Reservations => ({ value: Reservations.id, label: Reservations.id })));
      }

      const fetchLaundry = async()=>{
        const response = await axios.get("http://localhost:3001/addon/laundry");
        setLaundryType(response.data.map(LaundryType => ({ value: LaundryType.AddOn, label: LaundryType.AddOn })));
      }
      
      
      useEffect(() => {
        fetchLaundry();
      }, []);
      
        
      useEffect(()=>{
          fetchResNum();
        },[]);
      
        
        
    
      return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Add Laundry</label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit} 
              validationSchema={validationSchema}>
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                     <span className={style.select}>
                     <div className={style.lbl4}>
                      <label className={style.lbl3} for="ReservationId">Reservation Number</label><br/></div>
                      <span className={style.cont}>
                     <Field name="ReservationId"
                        render={({ field, form }) => (
                          <Select
                            options={[{ value: '', label: '-- None Selected -- ' }, ...Reservations]}
                            value={Reservations.find(option => option.value === field.value)}
                            onChange={option => 
                            form.setFieldValue(field.name, option.value)}
                            onBlur={() => form.setFieldTouched(field.name, true)}
                            isSearchable
                          />
 
                        )}
                    />                  
                       <ErrorMessage name="ReservationId"
                            component="span" 
                            className={style.error} 
                    /> 
                    </span>
                    </span>
                    
                    <span className={style.cont}>
                     <Field name="receivedDate" 
                         component={Input} 
                         label="Received Date"
                         type="date"
                         width="15vw" />
                         </span>
                         
                    <span className={style.cont}>
                     <Field name="returnDate"
                         component={Input}
                         label="Return Date"
                         type="date"
                         width="15vw" />
                         
                          <ErrorMessage name="returnDate"
                            component="span" 
                            className={style.error} 
                    />
                    </span>

                    <span className={style.cont}>
                     <Field name="load"
                         component={Input}
                         label="Load (Kg)"
                         type="number"
                         step = "0.1"
                         width="15vw"
                          />
                    <ErrorMessage name="load"
                        component="span" 
                        className={style.error} 
                    />
                    </span>

                    <span className={style.select}>
                     <div className={style.lbl4}>
                      <label className={style.lbl3} for="type">Type</label><br/></div>
                      <span className={style.cont}>
                      <Field name="type"
                        render={({ field, form }) => (
                          <Select
                            options={[{ value: '', label: '-- None Selected -- ' }, ...LaundryType]}
                            value={LaundryType.find(option => option.value === field.value)}
                            onChange={option => 
                            form.setFieldValue(field.name, option.value)}
                            onBlur={() => form.setFieldTouched(field.name, true)}
                            isSearchable
                          />
 
                        )}
                    /> 
                    <ErrorMessage name="type"
                        component="span" 
                        className={style.error} 
                    />
                    </span>
                    </span>
                 </div>

                 <div className={style.div2}> 
                     <Field name="addInfo"
                         component={Input}
                         label="Additional Information"
                         type="textarea"
                         rows="4"
                         cols="150" />
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
