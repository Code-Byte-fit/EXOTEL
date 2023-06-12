import React,{useContext} from "react";
import axios from "axios"; 
import style from '../components/Login.module.css'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Input from '../../General/Inputs/Inputs'
import * as Yup from 'yup' 
import { useNavigate } from 'react-router-dom';
import {AppContext} from "../../../Helpers/AppContext"


function FormOne(props){
    const navigate = useNavigate();
    const {host,setAuthState}=useContext(AppContext)
    const initialValues = {userName: "",password: ""};

    const onSubmit = (data) => {
        axios.post(`${host}/userAccounts/login`,data).then((response) =>{
            if(response.data.error) {
                alert(response.data.error);
            }else{
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    userAccountId:response.data.userAccountId,
                    userName:response.data.userName,
                    FirstName:response.data.FirstName,
                    LastName:response.data.LastName,
                    userRole:response.data.userRole,
                    proPic:response.data.proPic,
                    country:response.data.country,
                    email:response.data.Email,
                    phone:response.data.Phone,
                    status:true,
                })
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
                />
                
                <ErrorMessage name="userName" component="span"/>

                <Field name="password"
                component = {Input}
                label = "Password"
                type = "password"
                width = "20vw"
                />
                <ErrorMessage name="password" component="span"/>
                </div>
                
                <a href={props.forgotlink} className={style.forgot}>Forgot Password</a>
                <button type ="Submit" className={style.btn1}><span>Log In</span></button>
    <small className={style.terms}>By clicking "Log in" you confirm that you accept the <a href={props.term}> Terms of Service</a></small>
            </Form>
        </Formik>


    
</div>


}

export default FormOne;
