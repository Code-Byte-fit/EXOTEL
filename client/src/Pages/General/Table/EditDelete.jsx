import React,{useState, useEffect, useRef} from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import successIcon from "../../../Assets/Images/Success.png"
import failureIcon from "../../../Assets/Images/failure.png"
import style from "./Style.module.css";

export default function EditDelete(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] =useState(false);
  const [editOpen, setEditOpen] =useState(false);
  const [cancelOpen, setCancelOpen] =useState(false);
  const [reBookOpen, setreBookOpen] =useState(false);
  const [checkInOpen, setcheckInOpen] =useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const closeModal = () => {
    setDeleteOpen(false);
    setEditOpen(false)
    setCancelOpen(false)
    setreBookOpen(false)
    setcheckInOpen(false)
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setEditOpen(true)
    setIsOpen(false);
  };

  const handleDelete = () => {
    setDeleteOpen(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setCancelOpen(true);
    setIsOpen(false);
  };

  const handleReBook = () => {
    setreBookOpen(true);
    setIsOpen(false);
  };

  const handleCheckIn = () => {
    setcheckInOpen(true);
    setIsOpen(false);
  };

  const handleClosePopup = () => {
    setDeleteOpen(false);
    setEditOpen(false)
    setCancelOpen(false)
    setreBookOpen(false)
    setcheckInOpen(false)

  };

  
  const handleDone=()=>{
    props.handleDone();
    closeModal();
  }

  const handleReBookError=()=>{
    props.handleReBookError();
    closeModal();
  }


  

  return (
    <>
      <BsThreeDotsVertical onClick={handleClick} className={style.dots}/>
      {isOpen &&
      <div className={style.optionCont} ref={ref}>
        {props.checkinOption && <div className={`${style.options} ${style.checkIn}`} onClick={handleCheckIn}>Check-In</div>}
        {props.editOption && <div className={`${style.options} ${style.edit}`} onClick={handleEdit}>Edit</div>}
        {props.removeOption && <div className={`${style.options} ${style.delete}`} onClick={handleDelete}>Remove</div>}
        {props.cancelOption && <div className={`${style.options} ${style.delete}`} onClick={handleCancel}>Cancel</div>}
        {props.reBookOption && <div className={`${style.options} ${style.delete}`} onClick={handleReBook}>Re-Book</div>}  
      </div>
      }

      {/* delete */}
      <Popup open={deleteOpen} closeOnDocumentClick={false}  onClose={handleClosePopup}>
         {!props.isDone?
         <div className={style.confirmModal}>
          <span className={style.confirmHeading}>{props.deleteHeading}</span>
          <span className={style.confirmBody}>{props.deleteBody}</span>
          <div className={style.modalBtnContainer}>
              <button onClick={closeModal} className={`${style.Btn} ${style.cancelBtn}`}>Cancel</button>
          </div>
        </div>:
        <>
          <div className={style.confirmModal}>
            <img src={successIcon} className={style.successIcon}/>
            <span className={`${style.confirmHeading} ${style.success}`}>Success!</span>
            <span className={style.confirmBody}>{props.successMsg}</span>
            <button onClick={handleDone} className={`${style.Btn} ${style.doneBtn}`}>Done</button>
          </div>
        </>
        }
      </Popup>


      {/* edit  */}
      <Popup open={editOpen}  closeOnDocumentClick={false} onClose={handleClosePopup}>
         {!props.isDone?props.editComponent:
          (props.success ? 
          <>
          <div className={style.confirmModal}>
            <img src={successIcon} className={style.successIcon}/>
            <span className={`${style.confirmHeading} ${style.success}`}>Success!</span>
            <span className={style.confirmBody}>Successfully Updated</span>
            <button onClick={handleDone} className={`${style.Btn} ${style.doneBtn}`}>Done</button>
          </div>
          </> :
          ()=>{handleDone()})}
      </Popup>

      {/* cancel  */}
      <Popup open={cancelOpen}  closeOnDocumentClick={true} onClose={handleClosePopup}>
         {!props.isDone?
          <div className={style.confirmModal}>
          <span className={style.confirmHeading}>{props.cancelHeading}</span>
          <span className={style.confirmBody}>{props.cancelBody}</span>
          <div className={style.modalBtnContainer}>
              <button onClick={closeModal} className={`${style.Btn} ${style.cancelBtn}`}>Close</button>
              <button onClick={props.onCancel} className={`${style.Btn} ${style.deleteBtn}`}>Cancel</button>
          </div>
        </div>
         :
        <>
          <div className={style.confirmModal}>
            <img src={successIcon} className={style.successIcon}/>
            <span className={`${style.confirmHeading} ${style.success}`}>Success!</span>
            <span className={style.confirmBody}>Successfully Cancelled</span>
            <button onClick={handleDone} className={`${style.Btn} ${style.doneBtn}`}>Done</button>
          </div>
        </>
        }
      </Popup>

      {/* reBook  */}
      <Popup open={reBookOpen}  closeOnDocumentClick={true} onClose={handleClosePopup}>
         {!props.isDone ?
          (props.isReBookValid ? 
          <div className={style.confirmModal}>
            <span className={style.confirmHeading}>Confirm Re-Booking</span>
            <span className={style.confirmBody}>Are you sure that you want to rebook this reservation</span>
            <div className={style.modalBtnContainer}>
                <button onClick={closeModal} className={`${style.Btn} ${style.cancelBtn}`}>Cancel</button>
                <button onClick={props.onRebook} className={`${style.Btn} ${style.rebookBtn}`}>Re-Book</button>
            </div>
          </div>
          :
          <div className={style.confirmModal}>
          <img src={failureIcon} className={style.successIcon}/>
           <span className={`${style.confirmHeading} ${style.success}`}>Re-Book Failed!</span>
           <span className={style.confirmBody}>Room(s) is/are already Booked.</span>
           <div className={style.okBtnCont}>
              <button type="button" onClick={handleReBookError} className={`${style.Btn}  ${style.okBtn}`}>Ok</button>
            </div>
        </div> 
          )
            
         :
        <>
          <div className={style.confirmModal}>
            <img src={successIcon} className={style.successIcon}/>
            <span className={`${style.confirmHeading} ${style.success}`}>Success!</span>
            <span className={style.confirmBody}>Successfully Re-Booked</span>
            <button onClick={handleDone} className={`${style.Btn} ${style.doneBtn}`}>Done</button>
          </div>
        </>
        }
      </Popup>

      {/* CheckIn  */}
      <Popup open={checkInOpen}  closeOnDocumentClick={true} onClose={handleClosePopup}>
         {!props.isDone?
          <div className={style.confirmModal}>
          <span className={style.confirmHeading}>Check-In Guest </span>
          <span className={style.confirmBody}>Are you sure you want to check-in this guest?</span>
          <div className={style.modalBtnContainer}>
              <button onClick={closeModal} className={`${style.Btn} ${style.cancelBtn}`}>Cancel</button>
              <button onClick={props.onCheckIn} className={`${style.Btn} ${style.checkInBtn}`}>Check-In</button>
          </div>
        </div>
         :
        <>
          <div className={style.confirmModal}>
            <img src={successIcon} className={style.successIcon}/>
            <span className={`${style.confirmHeading} ${style.success}`}>Success!</span>
            <span className={style.confirmBody}>Successfully Checked-In</span>
            <button onClick={handleDone} className={`${style.Btn} ${style.doneBtn}`}>Done</button>
          </div>
        </>
        }
      </Popup>
      
    </>
  );
}
