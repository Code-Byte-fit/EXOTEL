import React, { useState } from 'react';
import Input from "../../General/Inputs/Inputs";
import style from "./Types.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';


function EditType(props) {


    const validationSchema = Yup.object().shape({
        TypeName: Yup.string().required('Required'),
        NoOfBeds: Yup.number()
            .required('Required')
            .typeError('Must contain only numbers'),
        sqFeet: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, 'Must contain only numbers'),
        View: Yup.string().required('Required'),
        StandardCharge: Yup.string()
            .required('Required')
            .typeError('Must contain only numbers'),
        AddInfo: Yup.string(),
    });

    const view = [{ key: "--None Selected --", value: "" },
    { key: "Beach View", value: "Beach View" },
    { key: "Pool View", value: "Pool View" },
    { key: "Graden View", value: "Graden View" },
    { key: "Patio View", value: "Patio View" },
    { key: "City View", value: "City View" }]

    return (

        <div className={style.editCont}>


            <div className={style.editHeading}>Edit Room Type</div>

            <Formik initialValues={props.values} onSubmit={null} validationSchema={validationSchema} >
                <Form>

                    <div className={style.Editdiv1}>

                        <span className={style.box1}>
                            <Field name="TypeName"
                                component={Input}
                                label="Room Type"
                                type="text"

                                width="13vw" />
                            <ErrorMessage name="TypeName" component="span" className={style.error} />
                        </span>

                        <span className={style.box1}>
                            <Field name="View"
                                component={Input}
                                label="View"
                                type="select"
                                options={view}

                                className={style.inputOne}
                                width="13vw" />
                            <ErrorMessage name="View" component="span" className={style.error} />
                        </span>

                        <span className={style.box1}>
                            <Field name="NoOfBeds"
                                component={Input}
                                label="No of Beds"
                                type="text"

                                width="13vw" />
                            <ErrorMessage name="NoOfBeds" component="span" className={style.error} />
                        </span>
                        <span className={style.box1}>
                            <Field name="sqFeet"
                                component={Input}
                                label="Square Feet(Sqft)"
                                type="text"

                                width="13vw" />
                            <ErrorMessage name="sqFeet" component="span" className={style.error} />
                        </span>

                        <span className={style.box1}>
                            <Field name="StandardCharge"
                                component={Input}
                                label="Standard Charge($)"
                                type="text"

                                width="13vw" />
                            <ErrorMessage name="StandardCharge" component="span" className={style.error} />
                        </span>

                    </div>

                    <div className={style.Editdiv2}>

                        <Field name="AddInfo"
                            component={Input}
                            label="Additional Information"
                            type="textarea"
                            rows="3"
                            cols="70" />

                    </div>


                    <div className={style.confirmBtnCont}>
                        <button type='button' className={`${style.editBtn} ${style.cancelBtn}`}>Cancel</button>
                        <button type='button' className={`${style.editBtn} ${style.confirmBtn}`}>Confirm</button>
                    </div>



                </Form>
            </Formik>


        </div>
    )
}

export default EditType;