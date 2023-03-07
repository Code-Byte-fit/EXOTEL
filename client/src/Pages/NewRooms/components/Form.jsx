import React, { useState } from 'react';
import Input from "../../General/Inputs/Inputs";
import style from "./Rooms.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import ConfirmationPopup from '../../NewRooms/components/ConfirmationPopup';

function FormOne({ handleAddFormChange }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const initialValues = {
        RoomNo: '',
        TypeId: '',
        BaseCharge: '',
        floor: '',
        sqFeet: '',
        Status: 'available'
    };
    const validationSchema = Yup.object().shape({
        RoomNo: Yup.string().required("*Room Number is Required")
            .matches(/^[A-Za-z0-9]+$/, 'Must only contain letters and numbers')
            .max(10, 'Room Number must be at most 10 characters long'),
        TypeId: Yup.string().required("*Room Type is Required"),
        BaseCharge: Yup.number().required("*Base Charge is Required"),
        floor: Yup.string().required("*Floor is Required"),
        sqFeet: Yup.number().required("*Square Feet is Required"),
    });

    const makeReq = async (formData) => {
        await axios.post("http://localhost:3001/rooms", formData);
    }

    const onSubmit = (data) => {
        makeReq(data)

    };



    const baseCharge = [
        { key: "--None Selected --", value: "" },
        { key: "500", value: "500" },
        { key: "1000", value: "1000" },
        { key: "2000", value: "2000" }]

    const Floor = [
        { key: "--None Selected --", value: "" },
        { key: "Ground Floor", value: "Ground Floor" },
        { key: "1st Floor", value: "1st Floor" },
        { key: "2nd Floor", value: "3rd Floor" }]

    const sqFeet = [{ key: "--None Selected --", value: "" },
    { key: "250 cm2", value: "250" },
    { key: "500 cm2", value: "500" },
    { key: "550 cm2", value: "550" }]

    return (

        <span className={style.formContainer}>


            <label className={style.labelOne}>Add Room</label>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form>

                    <div className={style.div1}>

                        <span>
                            <Field name="RoomNo"
                                component={Input}
                                label="Room Number"
                                type="text"
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="RoomNo" component="div" className={style.error} />
                        </span>

                        <span>
                            <Field name="TypeId"
                                component={Input}
                                label="Room Type"
                                type="text"
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="TypeId" component="div" className={style.error} />
                        </span>
                        <span>
                            <Field name="BaseCharge"
                                component={Input}
                                label="Base Charge"
                                type="select"
                                options={baseCharge}
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="BaseCharge" component="div" className={style.error} />
                        </span>
                        <span>
                            <Field name="floor"
                                component={Input}
                                label="Floor"
                                type="select"
                                options={Floor}
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="floor" component="div" className={style.error} />
                        </span>
                        <span>
                            <Field name="sqFeet"
                                component={Input}
                                label="Square Feet"
                                type="select"
                                options={sqFeet}
                                className={style.inpuOne}
                                onBlur={handleAddFormChange}
                                width="13vw" />
                            <ErrorMessage name="sqFeet" component="div" className={style.error} />
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
                        <button className={style.buttonOne} type="submit">Create Room</button>
                    </span>



                </Form>
            </Formik>


        </span>
    )
}

export default FormOne;