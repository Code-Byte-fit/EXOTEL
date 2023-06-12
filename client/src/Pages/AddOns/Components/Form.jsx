import React, { useState } from 'react';
import Input from "../../General/Inputs/Inputs";
import style from "./AddOns.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Spinner from '../../General/Spinner/Spinner';
function FormOne(props) {
 const [loading, setLoading] = useState(false);
    const initialValues = {
        AddOn: '',
        Unit: '',
        Charge: '',
        AddInfo: ''
    };
    const validationSchema = Yup.object().shape({
        AddOn: Yup.string().required("Required"),
        Charge: Yup.number()
          .required("Required")
          .min(0, "Invalid")
          .typeError("Invalid")
          .positive("Invalid"),
        Unit: Yup.string().required("Required"),
        AddInfo: Yup.string(),
      });
      

    const handleSubmit = (values, { resetForm }) => {
        props.makeReq(values);
        resetForm({ values: initialValues });
    };

    return (

        <span className={style.formContainer}>
            <label className={style.labelOne}>Create Add-On</label>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
                <Form>
                    <div className={style.div1}>
                        <span className={style.box}>
                            <Field name="AddOn"
                                component={Input}
                                label="Add-On"
                                type="text"
                                width="13vw" />
                            <ErrorMessage name="AddOn" component="span" className={style.error} />
                        </span>

                        <span className={style.box}>
                            <Field name="Unit"
                                component={Input}
                                label="Unit"
                                type="text"
                                width="13vw" />
                            <ErrorMessage name="Unit" component="span" className={style.error} />
                        </span>
                        <span className={style.box}>
                            <Field name="Charge"
                                component={Input}
                                label="Charge"
                                type="text"
                                width="13vw" />
                            <ErrorMessage name="Charge" component="span" className={style.error} />
                        </span>
                    </div>

                    <div className={style.div2}>
                        <Field name="AddInfo"
                            component={Input}
                            label="Additional Information"
                            type="textarea"
                            rows="4"
                            cols="150" />
                    </div>
                    <span className={style.createBtn}>
                        <button className={style.buttonOne} type="submit">Create Add On</button>
                    </span>
                </Form>
            </Formik>
        </span>
    )
}

export default FormOne;