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
                    status:true,
                })
                navigate('/dashBoard');
            }
            
        });
    };

    const validationSchema = Yup.object().shape({                     // Defining a validation schema using 'Yup' library
        userName:Yup.string().required(" *Required"),                 
        password:Yup.string().required(" *Required"),                 
    
    })

    return  <div className={style.cont3}>                             {/* Returning JSX code to render the login form */}
        <Formik
            initialValues={initialValues}
             onSubmit={onSubmit} 
             validationSchema={validationSchema}>
            <Form>
                <div className={style.inputs}>                        {/* Div for contain input fields */}

                <Field name="userName"
                component = {Input}
                label = "User Name"
                type = "text"
                width = "20vw"
                />
                <ErrorMessage name="userName" component="span"/> <br></br>     {/* Displaying error message for user name field*/}

                <Field name="password"
                component = {Input}
                label = "Password"
                type = "password"
                width = "20vw"
                />
                <ErrorMessage name="password" component="span"/>
                </div>
                <Link to="../../ForgotPassword/ForgotPassword" className={style.forgot}>Forgot Password</Link> {/* Link to navigate to forgot password page */}
                {/* <a href={props.forgotlink} className={style.forgot}>Forgot Password</a> Link to navigate to forgot password page */}
                <button type ="Submit" className={style.btn1}>Log In</button>           {/* Submit button to submit the form */}

    <small className={style.terms}>By clicking "Log in" you confirm that you accept the <a href={props.term}> Terms of Service</a></small> {/* Displaying terms and conditions of using the website */}

            </Form>
        </Formik>


    
</div>


}

export default FormOne; // Exporting the 'FormOne' component as default.
