import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import style from "./Promotions.module.css";
import React, { useState } from 'react';


function FormOne(props) {
    
    const today = new Date();
    const initialValues = {
        PromoCode: '',
        PromoType: '',
        Value: '',
        MaxUses: '',
        Status: '',
        Startdate: today.toISOString().slice(0, 10), // set to today's date in yyyy-mm-dd format
        Enddate: today.toISOString().slice(0, 10), // set to today's date in yyyy-mm-dd format
        AddInfo:''
    };
    

    const [Promotions, setPromotions] = useState([]);

    const validationSchema = Yup.object().shape({
        PromoCode: Yup.string().required('Required'),
        PromoType: Yup.string().required('Required'),
        Value: Yup.number().required('Required'),
        MaxUses: Yup.number()
  .required('Required')
  .test('non-negative', 'MaxUses must be non-negative', function (value) {
    return value >= 0;
  }),

        Status: Yup.string().required('Required'),
        Startdate: Yup.date()
          .required('Required')
          .test(
            'end-date-after-start-date',
            'End date must be after start date',
            function (value) {
              const { Enddate } = this.parent;
              return !Enddate || value <= Enddate;
            }
          ),
        Enddate: Yup.date()
          .required('Required')
          .test(
            'end-date-after-start-date',
            'End date must be after start date',
            function (value) {
              const { Startdate } = this.parent;
              return !Startdate || value >= Startdate;
            }
          ),
          AddInfo: Yup.string(),
      });
      

    const Status = [{ key: "--None Selected --", value: "" },
    { key: "Active", value: "Active" },
    { key: "Disabled", value: "Disabled" },
    { key: "Expired", value: "Expired" }]

  
    return (
        <span className={style.formContainer}>
            <label className={style.labelOne}>Add Promotions</label>

            <Formik initialValues={initialValues} onSubmit={props.makeReq} validationSchema={validationSchema}>
              <Form>
              <div className={style.div1}>
              <div>

              <span>  
                        <Field name="PromoCode"
                            component={Input}
                            label="Promo Code"
                            type="text"
                           
                            width="13vw" />
                     <ErrorMessage name="PromoCode" component="div" className={style.error}/>
                    </span>
                    <span>  
                        <Field name="PromoType"
                            component={Input}
                            label="Promo Type"
                            type="text"
                          
                            width="13vw" />
                      <ErrorMessage name="PromoType" component="div" className={style.error}/>
                    </span>
                    <span>  
                        <Field name="Value"
                            component={Input}
                            label="Value"
                            type="text"
                          
                            width="13vw" />
                     <ErrorMessage name="Value" component="div" className={style.error}/>
                    </span>
                    <span >  
                        <Field name="MaxUses"
                            component={Input}
                            label="Max Uses"
                            type="number"
                           
                            width="13vw" 
                           
                            />
                      <ErrorMessage name="MaxUses" component="div" className={style.error}/>
                    </span>
                    <span>  
                        <Field name="Status"
                            component={Input}
                            label="Status"
                            type="select"
                          
                            options={Status}
                            width="13vw" />
                       <ErrorMessage name="Status" component="div" className={style.error}/>
                    </span>
              </div>
                    <div className={style.div6}>
                    <div className={style.div7}>
                    <span>  
                        <Field name="Startdate"
                            component={Input}
                            label="Start Date"
                            type="Date"
                          
                            width="13vw" />
                       <ErrorMessage name="Startdate" component="div" className={style.error}/>
                    </span>
                    <span>  
                        <Field name="Enddate"
                            component={Input}
                            label="End Date"
                            type="Date"
                           
                            width="13vw" />
                       <ErrorMessage name="Enddate" component="div" className={style.error}/>
                    </span>
                    </div>
                    <div className={style.textArea}> 
                        <Field name="AddInfo"
                            component={Input}
                            label="Additional Information"
                            type="textarea"
                            rows="5"
                            cols="115" />
                    </div>
                    

              </div>
            
                    </div>
                    <span className={style.createBtn}> 
                    <button  className={style.buttonOne}  type="submit">Create Promotion</button>
                    </span> 
                  
              </Form>  
            </Formik>
        </span>
    )
}

export default FormOne;