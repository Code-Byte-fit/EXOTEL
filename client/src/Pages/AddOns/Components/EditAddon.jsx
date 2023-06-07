import React, { useState, useContext } from 'react';
import Input from "../../General/Inputs/Inputs";
import style from "./AddOns.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { AppContext } from "../../../Helpers/AppContext"

function EditAddon(props) {

    const { host } = useContext(AppContext);

    const handleEdit = (data) => {
        axios.put(`${host}/addon`, data).then((res) => {
            props.setIsDone(true)
        })
    }

    const [initialValues, setInitialValues] = useState({ ...props.values, NewAddOn: props.values.AddOn })
    const validationSchema = Yup.object().shape({
        AddOn: Yup.string().required("Required"),
        Charge: Yup.number().required("Required"),
        Unit: Yup.string().required("Required"),
        AddInfo: Yup.string(),
    });

    return (

        <div className={style.editCont}>
            <div className={style.editHeading}>Edit Add-On</div>
            <Formik initialValues={initialValues} onSubmit={handleEdit} validationSchema={validationSchema}>
                {(formik) => (
                    <Form>

                        <div className={style.Editdiv1}>

                            <span className={style.box1}>
                                <Field name="NewAddOn"
                                    component={Input}
                                    label="Add-On"
                                    type="text"
                                    width="13vw" />
                                <ErrorMessage name="AddOn" component="span" className={style.error} />
                            </span>

                            <span className={style.box1}>
                                <Field name="Unit"
                                    component={Input}
                                    label="Unit"
                                    type="text"
                                    width="13vw" />
                                <ErrorMessage name="Unit" component="span" className={style.error} />
                            </span>
                            <span className={style.box1}>
                                <Field name="Charge"
                                    component={Input}
                                    label="Charge"
                                    type="text"
                                    width="13vw" />
                                <ErrorMessage name="Charge" component="span" className={style.error} />
                            </span>

                        </div>

                        <div className={style.Editdiv2}>
                            <Field name="AddInfo"
                                component={Input}
                                label="Additional Information"
                                type="textarea"
                                rows="4"
                                cols="150" />
                        </div>
                        <div className={style.confirmBtnCont}>
                            <button type='button' className={`${style.editBtn} ${style.cancelBtn}`}>Cancel</button>
                            <button type='submit' className={`${style.editBtn} ${style.confirmBtn}`}>Confirm</button>
                        </div>

                    </Form>
                )}

            </Formik>


        </div>
    )
}

export default EditAddon;