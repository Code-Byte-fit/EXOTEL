import React from "react";
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import style from '../components/Laundry.module.css'

export default function FormOne(props) {
    const today = new Date();
    const initialValues = {
        resNumber: '',
        receivedDate: today.toISOString().slice(0, 10),
        returnDate: '',
        load: ''
    };

    const validationSchema = Yup.object().shape({
      RoomNumber: Yup.string().required("Required"),
      Date: Yup.date().required("Required") ,
      ItemNumber: Yup.number().min(4).max(8).required("Required") ,
      Quantity:Yup.number().required("Required") 
    });
    

    // const RoomNumber = [
    //     {key:"--None Selected--", value:""},
    //     {key: "1", value:"1"},  
    //     {key: "2", value:"2"},
    //     {key: "3", value:"3"},
    //     {key: "4", value:"4"}
    //   ]
      return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Add Laundry</label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit} >
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                     {/* <ErrorMessage name="RoomNo" component="span"/> */}
                     <Field name="resNumber"
                         component={Input}
                         label="Res-Number"
                         type="text"
                         width="20vw" />
                     {/* <ErrorMessage name="Date" component="span"/> */}
                     <Field name="receivedDate" 
                         component={Input} 
                         label="Received Date"
                         type="date"
                         width="20vw" />
                     {/* <ErrorMessage name="ItemNumber" component="span"/> */}
                     <Field name="returnDate"
                         component={Input}
                         label="Return Date"
                         type="date"
                         width="20vw" />
                     {/* <ErrorMessage name="Qty" component="span"/> */}
                     <Field name="load"
                         component={Input}
                         label="Load (Kg)"
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
