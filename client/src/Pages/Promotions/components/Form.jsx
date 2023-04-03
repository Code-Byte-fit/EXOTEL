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
    AddInfo: ''
  };



  const validationSchema = Yup.object().shape({
    PromoCode: Yup.string().required('Required'),
    PromoType: Yup.string().required('Required'),
    Value: Yup.string()
      .required('Required')
      .matches(/%$/, 'Value must end with %'),
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
        'Invalid',
        function (value) {
          const { Enddate } = this.parent;
          return !Enddate || value <= Enddate;
        }
      ),
    Enddate: Yup.date()
      .required('Required')
      .test(
        'end-date-after-start-date',
        'Invalid',
        function (value) {
          const { Startdate } = this.parent;
          return !Startdate || value >= Startdate;
        }
      ),
    AddInfo: Yup.string(),
  });


  const Status = [{ key: "--None Selected --", value: "" },
  { key: "Active", value: "Active" },
  { key: "Disabled", value: "Disabled" },]

  const handleSubmit = (values, { resetForm }) => {
    props.makeReq(values);
    resetForm({ values: initialValues });
  };

  return (
    <span className={style.formContainer}>
      <label className={style.labelOne}>Add Promotions</label>

      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form>
          <div className={style.div1}>
            <div className={style.top}>


              <span className={style.box}>
                <Field name="PromoCode"
                  component={Input}
                  label="Promo Code"
                  type="text"
                />
                <ErrorMessage name="PromoCode" component="span" className={style.error} />
              </span>


              <span className={style.box}>
                <Field name="PromoType"
                  component={Input}
                  label="Promo Type"
                  type="text"
                />
                <ErrorMessage name="PromoType" component="span" className={style.error} />
              </span>

              <span className={style.box}>
                <Field name="Value"
                  component={Input}
                  label="Value(%)"
                  type="text"
                />
                <ErrorMessage name="Value" component="span" className={style.error} />
              </span>
              <span className={style.box}>
                <Field name="MaxUses"
                  component={Input}
                  label="Max Uses"
                  type="number"

                />
                <ErrorMessage name="MaxUses" component="span" className={style.error} />
              </span>


              <span className={style.box}>
                <Field name="Status"
                  component={Input}
                  label="Status"
                  type="select"

                  options={Status}
                />
                <ErrorMessage name="Status" component="span" className={style.error} />
              </span>
<div className={style.div6}> <span className= {style.box}>
                  <Field name="Startdate"
                    component={Input}
                    label="Start Date"
                    type="Date"

                  />
                  <ErrorMessage name="Startdate" component="span" className={style.error} />
                </span>
                <span className= {style.box}>
                  <Field name="Enddate"
                    component={Input}
                    label="End Date"
                    type="Date"
                     />
                  <ErrorMessage name="Enddate" component="span" className={style.error} />
                </span></div>
             
            </div>
            <div className={style.div7}>
             
              <div className={style.textArea}>
                <Field name="AddInfo"
                  component={Input}
                  label="Additional Information"
                  type="textarea"
                  rows="5"
                  cols="158" />
              </div>


            </div>



          </div>
          <span className={style.createBtn}>
            <button className={style.buttonOne} type="submit">Create Promotion</button>
          </span>

        </Form>
      </Formik>
    </span>
  )
}

export default FormOne;