import {React,useState,useRef,useEffect} from 'react'
import { NavLink,useMatch,useResolvedPath } from 'react-router-dom';
import dashBoardIcon from "../../../../../Assets/Images/Dashboard.png"
import style from "./NavBar.module.css"

export default function NavBar() {
  const [active,setActive]=useState(false);
  const navMenuRef = useRef(null);
  const navContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target) &&
        (!navMenuRef.current || !navMenuRef.current.contains(event.target))
      ) {
        setActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navContainerRef, navMenuRef]);


  const navLinkActive=({isActive}) => {
    return {
      color: isActive && "white",
      background:isActive && "#577e79"
    };
  }
  
    
  return (
    <>
    <div className={`${style.navContainer} ${active && style.active}`}>
          <div className={`${style.navIcon} ${active && style.open}`} onClick={()=>setActive(!active)} ref={navContainerRef}
>
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

    
    <nav className={`${style.navMenu} ${active && style.navActive}`} ref={navMenuRef}>
      <div className={style.upperIcons}>
          <NavLink  to="/createReservation" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                <img src={dashBoardIcon}/>
                <span>Create-Reservation</span>
          </NavLink>
          <NavLink  to="/reservationTab" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                  <img src={dashBoardIcon}/>
                  <span>Reservations Tab</span>
          </NavLink>
          <NavLink  to="/" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                  <img src={dashBoardIcon}/>
                  <span>DashBoard</span>
          </NavLink>
          <NavLink  to="/rooms" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                  <img src={dashBoardIcon}/>
                  <span>Rooms</span>
          </NavLink>
          <NavLink  to="/promotion" style={navLinkActive} className={style.navLink} onClick={()=>setActive(!active)}>
                  <img src={dashBoardIcon}/>
                  <span>Promotions</span>
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
