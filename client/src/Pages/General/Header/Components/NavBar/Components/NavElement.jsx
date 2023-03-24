import React,{useState} from 'react'
import { NavLink} from 'react-router-dom';
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
