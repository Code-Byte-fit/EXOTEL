import React, { useState } from "react";
import axios from "axios"; 
import style from '../components/Login.module.css'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Input from '../../General/Inputs/Inputs'
import * as Yup from 'yup' 
import { useNavigate } from 'react-router-dom';

function FormOne(props){
    // const [userName, setUsername] = useState([]); // define setListOfLogin
    // const [passWord, setPassword] = useState([]); // define setListOfLogin
    
    const navigate = useNavigate();

    const initialValues = {
        userName: "",
        password: "",
    };

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/userAccounts/login",data).then((response) =>{
            if(response.data.error) {
                alert(response.data.error);
            }else{
                sessionStorage.setItem("accessToken", response.data);
                console.log(response.data)
                navigate('/');
            }
            
        });
    };

    const validationSchema = Yup.object().shape({
        userName:Yup.string().required(),
        password:Yup.string().required(),
    
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
                width = "20vw"
                // value={userName}
                // onChange={(event) =>{
                //     setUsername(event.target.value);
                // }}
                />
                
                <ErrorMessage name="userName" component="span"/>

                <Field name="password"
                component = {Input}
                label = "Password"
                type = "text"
                width = "20vw"
                // onChange={(event) =>{
                //     setPassword(event.target.value);
                // }}
                />
                <ErrorMessage name="password" component="span"/>
                </div>
                
                <a href={props.forgotlink} className={style.forgot}>Forgot Password</a>
                <button type ="Submit" className={style.btn1}><span>Log In</span></button>
    <small className={style.terms}>By clicking "Log in" you confirm that you accept the <a href={props.term}> Terms of Service</a></small>
            </Form>
        </Formik>



    {/* <label className={style.lbl2}>Welcome Back,</label>
    <TextInput placeholder="Email" type="text"/>
    <TextInput placeholder="Password" type="password" /> */}
    {/* <input type="checkbox" className={style.check}/>
    <span className={style.remember}>Remember Me</span> */}
    
</div>


}

export default FormOne;
