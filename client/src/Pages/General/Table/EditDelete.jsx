import React,{useState, useEffect, useRef} from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import successIcon from "../../../Assets/Images/Success.png"
import style from "./Style.module.css";

export default function EditDelete(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] =useState(false);
  const [isDeleted, setIsDeleted] =useState(false);
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
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    props.onEdit();
    setIsOpen(false);
  };

  const handleDelete = () => {
    setDeleteOpen(true);
    setIsOpen(false);
  };

  const handleClosePopup = () => {
    setDeleteOpen(false);
  };

  const handleConfirm=()=>{
    props.onDelete()
    setIsDeleted(true);
  }

  

  

  return (
    <>
      <BsThreeDotsVertical onClick={handleClick} className={style.dots}/>
      {isOpen && 
      <div className={style.optionCont} ref={ref}>
        <div className={`${style.options} ${style.edit}`} onClick={handleEdit}>Edit</div>
        <div className={`${style.options} ${style.delete}`} onClick={handleDelete}>Delete</div>
      </div>
      }
      <Popup open={deleteOpen}  onClose={handleClosePopup}>
         {!isDeleted?
         <div className={style.confirmModal}>
          <span className={style.confirmHeading}>Confirm Deletion</span>
          <span className={style.confirmBody}>Are you sure you want to delete this reservation?</span>
          <div className={style.modalBtnContainer}>
              <button onClick={closeModal} className={`${style.Btn} ${style.cancelBtn}`}>Cancel</button>
              <button onClick={handleConfirm} className={`${style.Btn} ${style.deleteBtn}`}>Delete</button>
          </div>
        </div>:
        <>hi</>
        }
      </Popup>
    </>
  );
}