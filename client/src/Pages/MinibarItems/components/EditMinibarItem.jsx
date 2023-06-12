import React,{useState} from "react";
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import style from '../components/Minibar.module.css'

export default function FormOne(props) {
    const [initialValues, setInitialValues] = useState({...props.values, newItemName: props.values.ItemName})


    const handleEdit = (data,success) => {
    success?
    axios.put("http://localhost:3001/Minibar/item", data).then((res) => {
      props.setIsDone(true);
      props.setSuccess(success);
    }):
      props.setIsDone(true);
      props.setSuccess(success);
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
              onSubmit={handleEdit} 
              validationSchema={validationSchema}>
                {(formik)=>(
                 <Form>
                 <div className={style.div1}>
                 <span className={style.cont}>
                     <Field name="newItemName" 
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
                 <div className={style.confirmBtnCont}>
                            <button type='button' className={`${style.editBtn} ${style.cancelBtn}`} onClick={()=>{handleEdit(formik.values,false)}} >Cancel</button>
                            <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} onClick={()=>{handleEdit(formik.values,true)}} >Confirm</button>
                        </div>
             </Form>
                )}
      </Formik>        
        </div>  
    ) 
  }
                               
