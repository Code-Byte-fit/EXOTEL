import React,{useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../../CreateReservation/Components/Popup.css"
import successIcon from "../../../Assets/Images/Success.png"
import style from "./Style.module.css"

export default function Confirm(props) {
  const [open, setOpen] =useState(false); //open popup
  const closeModal = () => setOpen(false);
  const [isConfirmed,setIsConfirmed]=useState(false);
  const handleConfirm = () => {
    props.onConfirm();
    setIsConfirmed(true)
  };
  return (
    <>
    <button type="button" className={style.save} onClick={() => setOpen(o => !o)}>Save</button>
    <Popup open={open} closeOnDocumentClick={false} onClose={closeModal}>
      {!isConfirmed ? 
        <div className={style.confirmModal}>
           <span className={style.confirmHeading}>Confirm Updates</span>
           <span className={style.confirmBody}>Are you sure you want to proceed</span>
           <div className={style.modalBtnContainer}>
              <button type="button" onClick={closeModal} className={style.cancelBtn}>Cancel</button>
              <button  className={`${style.Btn} ${style.confirmBtn}`} onClick={handleConfirm()}>Confirm</button>
            </div>
        </div>
        :
        <div className={style.confirmModal}> 
           <img src={successIcon} className={style.successIcon}/>
           <span className={`${style.confirmHeading} ${style.success}`}>Success!</span>
           <span className={style.confirmBody}>Successfully updated profile</span>
           <button onClick={closeModal} className={`${style.Btn} ${style.doneBtn}`}>Done</button>
        </div>
        }
      </Popup>

    </>
  )
}
