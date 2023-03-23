// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import Input from "../../General/Inputs/Inputs";
// import style from "./Rooms.module.css";
// import axios from 'axios';
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup';

// function EditRoom(props) {
//     const [showConfirmation, setShowConfirmation] = useState(false);
//     const [RoomTypes, setRoomTypes] = useState([]);


//     const validationSchema = Yup.object().shape({
//         RoomNo: Yup.string()
//           .required('Required')
//           .matches(/^[A-Za-z0-9]+$/, 'Must only contain letters and numbers')
//           .max(10, 'Must be at most 10 characters long'),
//         RoomTypeView: Yup.string().required('Required'),
//         AdditionalCharges: Yup.number()
//           .required('Required')
//           .typeError('Must only contain numbers'),
//         TotalCharge: Yup.number().required('Required'),
//         floor: Yup.string().required('Required'),
//         Status: Yup.string().required('Required'),
//         AddInfo: Yup.string(),
//       });
      

//     const fetchRoomTypes = async () => {
//         const response = await axios.get("http://localhost:3001/roomtypes");
//         setRoomTypes(response.data);
//     }

//     useEffect(() => {
//         fetchRoomTypes();
//     }, []);

//     const Floor = [
//         { key: "--None Selected --", value: "" },
//         { key: "Ground Floor", value: "Ground Floor" },
//         { key: "1st Floor", value: "1st Floor" },
//         { key: "2nd Floor", value: "3rd Floor" }]


//     return (

//         <div className={style.editCont}>


//         <div className={style.editHeading}>Edit Room</div>

//             <Formik initialValues={props.values} onSubmit={null} validationSchema={validationSchema} >
//                 <Form>

//                     <div className={style.Editdiv1}>

//                         <span className={style.box1}>
//                             <Field name="RoomNo"
//                                 component={Input}
//                                 label="Room Number"
//                                 type="text"
//                                 width="13vw" />
//                             <ErrorMessage name="RoomNo" component="span" className={style.error} />
//                         </span>

//                         <span className={style.box1}>
//                             <Field
//                                 name="RoomTypeView"
//                                 component={Input}
//                                 label="Room Type"
//                                 type="select"
//                                 options={[
//                                     { key: "--None Selected --", value: "" },
//                                     ...RoomTypes.map(roomType => ({
//                                         key: `${roomType.TypeName}-${roomType.View}`,
//                                         value: `${roomType.TypeName}-${roomType.View}`
//                                     }))
//                                 ]}
//                                 width="13vw"
//                             />

//                             <ErrorMessage name="RoomTypeView" component="span" className={style.error} />
//                         </span>

//                         <span className={style.box1}>
//                             <Field name="AdditionalCharges"
//                                 component={Input}
//                                 label="Additional Charges($)"
//                                 type="text"
//                                 width="13vw" />
//                             <ErrorMessage name="AdditionalCharges" component="span" className={style.error} />
//                         </span>
//                         <span className={style.box1}>
//                             <Field name="floor"
//                                 component={Input}
//                                 label="Floor"
//                                 type="select"
//                                 options={Floor}
//                                 width="13vw" />
//                             <ErrorMessage name="floor" component="span" className={style.error} />
//                         </span>





//                     </div>

//                     <div className={style.Editdiv2}>
//                         <Field name="AddInfo"
//                             component={Input}
//                             label="Additional Information"
//                             type="textarea"
//                             rows="4"
//                             cols="150" />
//                     </div>
//                     <div className={style.confirmBtnCont}>
//                         <button type='button' className={`${style.editBtn} ${style.cancelBtn}`}>Cancel</button>
//                         <button type='button' className={`${style.editBtn} ${style.confirmBtn}`}>Confirm</button>
//                       </div>





//                 </Form>
//             </Formik>


//         </div>
//     )
// }

// export default EditRoom;