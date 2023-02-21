import {React,useState} from 'react'
import { NavLink,useMatch,useResolvedPath } from 'react-router-dom';
import dashBoardIcon from "../../../../../Assets/Images/Dashboard.png"
import style from "./NavBar.module.css"

export default function NavBar() {
  const [active,setActive]=useState(false);
  const navLinkActive=({isActive}) => {
    return {
      color: isActive && "white",
      background:isActive && "#22311E"
    };
  }
  
    
  return (
    <>
    <div className={`${style.navContainer} ${active && style.active}`}>
          <div className={`${style.navIcon} ${active && style.open}`} onClick={()=>setActive(!active)}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
          </div>
    </div>

    
    <nav className={`${style.navMenu} ${active && style.navActive}`}>
      <div className={style.upperIcons}>
          <NavLink  to="/createReservation" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                <img src={dashBoardIcon}/>
                <span>Create-Reservation</span>
          </NavLink>
          <NavLink  to="/reservationTab" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                  <img src={dashBoardIcon}/>
                  <span>Reservations Tab</span>
          </NavLink>
          <NavLink  to="/minibar" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                  <img src={dashBoardIcon}/>
                  <span>Mini-Bar/Laundry</span>
          </NavLink>
          <NavLink  to="/" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                  <img src={dashBoardIcon}/>
                  <span>DashBoard</span>
          </NavLink>
      </div>
      <div className={style.lowerIcons}>
      <NavLink  to="/dashboard" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                    <img src={dashBoardIcon}/>
                    <span>DashBoard</span>
      </NavLink>
          <NavLink  to="/reservationsTab" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                    <img src={dashBoardIcon}/>
                    <span>Reservations Tab</span>
          </NavLink>
          <NavLink  to="/" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                    <img src={dashBoardIcon}/>
                    <span>DashBoard</span>
          </NavLink>
          <NavLink  to="/" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                  <img src={dashBoardIcon}/>
                  <span>DashBoard</span>
          </NavLink>
      </div>
       
    </nav>
       
    </>
  )

  
}
