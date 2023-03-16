import React from "react";
import TextInput from "./TextInput";
// import "../components/style.css";
import style from '../components/Login.module.css'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Input from '../../General/Inputs/Inputs'
import * as Yup from 'yup' 

function FormOne(props){
    const initialValues = {
        userName: "",
        passWord: "",
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/login").then((response) =>{
            setListOfLogin(response.data);
        });
        // console.log(data);
    };

    const validationSchema = Yup.object().shape({
        userName:Yup.string().required(),
        passWord:Yup.string().required(),
    
    })

    return  <div className={style.cont3}>
        <Formik
            initialValues={initialValues}
             onSubmit={onSubmit} 
             validationSchema={validationSchema}>
            <Form>
                <div className={style.inputs}>
                <Field name="userName"
                component = {Input}
                label = "User Name"
                type = "text"
                width = "20vw"/>
                <ErrorMessage name="useraName" component="span"/>

                <Field name="passWord"
                component = {Input}
                label = "Password"
                type = "text"
                width = "20vw"/>
                <ErrorMessage name="passWord" component="span"/>
                </div>

            </Form>
        </Formik>



    {/* <label className={style.lbl2}>Welcome Back,</label>
    <TextInput placeholder="Email" type="text"/>
    <TextInput placeholder="Password" type="password" /> */}
    {/* <input type="checkbox" className={style.check}/>
    <span className={style.remember}>Remember Me</span> */}
    <a href={props.forgotlink} className={style.forgot}>Forgot Password</a>
    <button type ="Submit" className={style.btn1}><span>Log In</span></button>
    <small className={style.terms}>By clicking "Log in" you confirm that you accept the <a href={props.term}> Terms of Service</a></small>
</div>


}

export default FormOne;