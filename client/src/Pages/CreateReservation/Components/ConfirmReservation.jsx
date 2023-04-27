import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import successIcon from "../../../Assets/Images/Success.png"
import "./Popup.css"
import style from "./Style.module.css"

export default function ConfirmReservation(props) {
  const [open, setOpen] =useState(false); //open popup
  const closeModal = () => setOpen(false);

  const [isConfirmed,setIsConfirmed]=useState(false);

  const handleConfirm = () => {
    props.onConfirm();
    setIsConfirmed(true)
  };

  const navigate = useNavigate();
  const handleDone=()=>{
    closeModal();
    navigate('/reservationTab',{replace:true}); //redirect to reservations tab after creating reservation
  }

  return (
    <>
      <button type="button" className={style.Btn} onClick={() => setOpen(o => !o)}>Proceed</button>
      <Popup open={open} closeOnDocumentClick={false} onClose={closeModal}>
      {!isConfirmed ? 
        <div className={style.confirmModal}>
           <span className={style.confirmHeading}>Confirm Reservation</span>
           <span className={style.confirmBody}>Are you sure you want to proceed</span>
           <div className={style.modalBtnContainer}>
              <button type="button" onClick={closeModal} className={style.cancelBtn}>Cancel</button>
              <button  className={`${style.Btn} ${style.confirmBtn}`} onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
        :
        <div className={style.confirmModal}> 
           <img src={successIcon} className={style.successIcon}/>
           <span className={`${style.confirmHeading} ${style.success}`}>Success!</span>
           <span className={style.confirmBody}>Successfully added the reservation</span>
           <button onClick={handleDone} className={`${style.Btn} ${style.doneBtn}`}>Done</button>
        </div>
        }
        
      </Popup>
    </>
  )
}
