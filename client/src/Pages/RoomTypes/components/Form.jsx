import React, { useState } from 'react';
import Input from "../../General/Inputs/Inputs";
import style from "./Types.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import ConfirmationPopup from '../../NewRooms/components/ConfirmationPopup';

function FormOne({ handleAddFormChange }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const initialValues = {
        TypeName: '',
        NoOfBeds: '',
        sqFeet: '',
        BaseCharge: ''
    };
    const validationSchema = Yup.object().shape({
        TypeName: Yup.string().required("*Room Type is Required"),
        NoOfBeds: Yup.number().required("*Base Charge is Required"),
        sqFeet: Yup.string().required("*Floor is Required"),
        BaseCharge: Yup.number().required("*Square Feet is Required"),
    });

    const makeReq = async (formData) => {
        await axios.post("http://localhost:3001/roomtypes", formData);
    }

    const onSubmit = (data) => {
        makeReq(data)

    };


    return (

        <span className={style.formContainer}>


            <label className={style.labelOne}>Add Room Type</label>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form>

                    <div className={style.div1}>

                        <span>
                            <Field name="TypeName"
                                component={Input}
                                label="Room Type"
                                type="text"
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="TypeName" component="div" className={style.error} />
                        </span>
                        <span>
                            <Field name="NoOfBeds"
                                component={Input}
                                label="No Of Beds"
                                type="text"
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="NoOfBeds" component="div" className={style.error} />
                        </span>
                        <span>
                            <Field name="sqFeet"
                                component={Input}
                                label="Square Feet"
                                type="text"
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="sqFeet" component="div" className={style.error} />
                        </span>
                        
                        <span>
                            <Field name="BaseCharge"
                                component={Input}
                                label="Base Charge"
                                type="text"
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="BaseCharge" component="div" className={style.error} />
                        </span>


                    </div>

                    <div className={style.div2}>

                        <Field name="addInfo"
                            component={Input}
                            label="Additional Information"
                            type="textarea"
                            rows="4"
                            cols="150" />
                        <div className={style.cardContainer}>
                            <div className={style.card}>

                            </div>
                            <div className={style.card}>

                            </div>
                            <div className={style.card}>

                            </div>
                        </div>

                    </div>


                    <span className={style.createBtn}>
                        <button className={style.buttonOne} type="submit">Create Room Type</button>

                    </span>



                </Form>
            </Formik>


        </span>
    )
}

export default FormOne;