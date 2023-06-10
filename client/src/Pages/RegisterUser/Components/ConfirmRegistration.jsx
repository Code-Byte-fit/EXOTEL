import React, { useState,useContext} from 'react'
import {AppContext} from "../../../Helpers/AppContext"
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import successIcon from "../../../Assets/Images/Success.png"
import style from "./Style.module.css"

export default function ConfirmRegistration(props) {
  const {host}=useContext(AppContext)
  const navigate = useNavigate();
  const [open, setOpen] =useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isConfirmed,setIsConfirmed]=useState(false);
  
  const handleSubmit = async (values) => {
    try {
      const response=await axios.post(`${host}/register/${values.userName}`, values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsUserNameValid(true);
      setIsConfirmed(true)
      
      console.log(response.data)
    } catch (error) {
      setIsUserNameValid(false);
      console.error("userName Exists");
    }
  };

  const openModal=()=>{
      setOpen(o => !o)
  }

  const closeModal = () => {
    setOpen(false)
  };

  const handleInvalidUser=()=>{
    closeModal();
    setIsUserNameValid(true);
    
  }

  const handleDone=()=>{
    closeModal();
    navigate('/');
  }


  return (
    <>
      <button type="submit" className={`${style.Btn} ${style.RegisterBtn}`} onClick={props.isValid && openModal}>Register</button>
      <Popup open={open} closeOnDocumentClick={false} onClose={closeModal}>
      {!isConfirmed ?
        (isUserNameValid?
        <div className={style.confirmModal}>
           <span className={style.confirmHeading}>Confirm Registration</span>
           <span className={style.confirmBody}>Are you sure you want to proceed</span>
           <div className={style.modalBtnContainer}>
              <button type="button" onClick={closeModal} className={`${style.Btn} ${style.cancelBtn}`}>Cancel</button>
              <button  className={`${style.Btn} ${style.confirmBtn}`} onClick={()=>{handleSubmit(props.values)}}>Confirm</button>
            </div>
        </div>:
        <div className={style.confirmModal}>
           <span className={style.confirmHeading}>UserName Already Exists!</span>
           <span className={style.confirmBody}>Choose Another UserName to Proceed</span>
           <div className={style.modalBtnContainer}>
              <button type="button" onClick={handleInvalidUser} className={`${style.cancelBtn} ${style.okBtn}`}>Ok</button>
            </div>
        </div>)
        :
        <div className={style.confirmModal}>
           <img src={successIcon} className={style.successIcon}/>
           <span className={`${style.confirmHeading} ${style.success}`}>Success!</span>
           <span className={style.confirmBody}>Successfully registered user</span>
           <button onClick={handleDone} className={`${style.Btn} ${style.doneBtn}`}>Done</button>
        </div>
        }
        
      </Popup>
    </>
  )
}