import React, { useState } from 'react';
import { useEffect } from 'react';
import Input from "../../General/Inputs/Inputs";
import style from "./Rooms.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

function FormOne(props) {

    const [RoomTypes, setRoomTypes] = useState([]);


    const initialValues = {
      
        RoomNo: '',
        RoomTypeView: '',
        AdditionalCharges: '',
        TotalCharge: '',
        floor: '',
        Status: 'available',
        AddInfo: ''
    };
    const validationSchema = Yup.object().shape({
        RoomNo: Yup.string()
            .required('Required')
            .matches(/^[A-Za-z0-9]+$/, 'Must only contain letters and numbers')
            .max(10, 'Must be at most 10 characters long'),
        RoomTypeView: Yup.string().required('Required'),
        AdditionalCharges: Yup.string()
          .required('Required'),
        // TotalCharge: Yup.number().required('Required'),
        floor: Yup.string().required('Required'),
        Status: Yup.string().required('Required'),
        AddInfo: Yup.string(),
    });
    const handleSubmit = (values, { resetForm }) => {
        props.makeReq(values);
        resetForm({ values: initialValues });
    };

    const fetchRoomTypes = async () => {
        const response = await axios.get("http://localhost:3001/roomtypes");
        setRoomTypes(response.data);
    }

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const Floor = [
        { key: "--None Selected --", value: "" },
        { key: "Ground Floor", value: "Ground Floor" },
        { key: "1st Floor", value: "1st Floor" },
        { key: "2nd Floor", value: "3rd Floor" }]

      

    return (

        <span className={style.formContainer}>


            <label className={style.labelOne}>Create Room</label>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
                <Form>

                    <div className={style.div1}>

                        <span className={style.box}>
                            <Field name="RoomNo"
                                component={Input}
                                label="Room Number"
                                type="text"
                                width="13vw" />
                            <ErrorMessage name="RoomNo" component="span" className={style.error} />
                        </span>

                        <span className={style.box}>
                            <Field
                                name="RoomTypeView"
                                component={Input}
                                label="Room Type"
                                type="select"
                                options={[
                                    { key: "--None Selected --", value: "" },
                                    ...RoomTypes.map(roomType => ({
                                        key: `${roomType.TypeName}-${roomType.View}`,
                                        value: `${roomType.TypeName}-${roomType.View}`
                                    }))
                                ]}
                                width="13vw"
                            />

                            <ErrorMessage name="RoomTypeView" component="span" className={style.error} />
                        </span>

                        <span className={style.box}>
                            <Field name="AdditionalCharges"
                                component={Input}
                                label="Additional Charges($)"
                                type="text"
                                width="13vw" />
                            <ErrorMessage name="AdditionalCharges" component="span" className={style.error} />
                        </span>
                        <span className={style.box}>
                            <Field name="floor"
                                component={Input}
                                label="Floor"
                                type="select"
                                options={Floor}
                                width="13vw" />
                            <ErrorMessage name="floor" component="span" className={style.error} />
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
                        <button className={style.buttonOne} type="submit">Create Room</button>
                    </span>



                </Form>
            </Formik>


        </span>
    )
}

export default FormOne;