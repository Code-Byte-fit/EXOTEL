import React, { useState } from 'react'
import { NavLink} from 'react-router-dom';
import {ReactComponent as Arrow} from '../../../../../../Assets/Images/arrow.svg';
import style from "./NavBar.module.css"


export default function NavElement(props) {
    const navLinkActive=({isActive}) => {
        return {
          color: isActive && "white",
          background:isActive && "#577e79"
        };
      }
  return (
    <>
     <NavLink  to={props.to} style={navLinkActive} className={style.navLink} onClick={()=>props.setActive(!props.active)}>
          <img src={props.icon}/>
          <span>{props.desc}</span>
    </NavLink>
    </>
  )
}


export  function MultiElement(props){
   return(
    <div className={style.multiElement} onClick={props.onClick}>
      <div className={style.cato}>
        <img src={props.icon}/>
        <span>{props.desc}</span>
        <Arrow className={`${style.arrow} ${props.isActive && style.activeArrow}`}/>
      </div>
      <div  className={`${props.isActive?style.navPopup:style.navPopupHidden}`}>
        {props.children}
      </div>
    </div>
   )  
}


