import React, { useState } from "react";
import axios from "axios"; 
import style from '../components/Login.module.css'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import Input from '../../General/Inputs/Inputs'
import * as Yup from 'yup' 
import ForgotPassword from "../../ForgotPassword/ForgotPassword";
import { useNavigate ,Link } from 'react-router-dom';

function FormOne(props){ 
    
    const navigate = useNavigate(); 

    const initialValues = {                                         // Defining the initial values for form fields
        userName: "",
        password: "",
    };

    const onSubmit = (data) => {                                    // Defining a function 'onSubmit' to handle form submission
        axios.post("http://localhost:3001/userAccounts/login",data).then((response) =>{
            if(response.data.error) {                               // Checking if there is any error in the response data
                alert(response.data.error);                         
            }else{
                sessionStorage.setItem("accessToken", response.data); // Setting the 'accessToken' key in session storage with the response data
                console.log(response.data)                            // Logging the response data to console
                navigate('/'); 
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
/>              <br></br>
                <ErrorMessage name="password" component="span"/>  <br></br>    {/* Displaying error message for password field */}
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
