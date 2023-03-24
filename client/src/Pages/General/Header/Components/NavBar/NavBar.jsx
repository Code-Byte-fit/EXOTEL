import {React,useState,useRef,useEffect} from 'react'
import { NavLink} from 'react-router-dom';
import NavElement from './Components/NavElement';
import dashBoardIcon from "../../../../../Assets/Images/Dashboard.png"
import style from "./Components/NavBar.module.css"

export default function NavBar(props) {
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
          <div className={`${style.navIcon} ${active && style.open}`} onClick={()=>setActive(!active)} ref={navContainerRef}>
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
      {props.role==="receptionist" && 
      <>
      <NavElement to="/receptionist" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
      <NavElement to="/createReservation" icon={dashBoardIcon} desc="Create-Reservation" active={active} setActive={setActive}/>
      <NavElement to="/reservationTab" icon={dashBoardIcon} desc="Reservations Tab" active={active} setActive={setActive}/>
      <NavElement to="/rooms" icon={dashBoardIcon} desc="Rooms" active={active} setActive={setActive}/>
      </>}

      {props.role==="admin" && 
      <>
      <NavElement to="/receptionist" icon={dashBoardIcon} desc="a"/>
      <NavElement to="/createReservation" icon={dashBoardIcon} desc="Create-Reservation"/>
      <NavElement to="/reservationTab" icon={dashBoardIcon} desc="Reservations Tab"/>
      <NavElement to="/rooms" icon={dashBoardIcon} desc="Rooms"/>
      </>}
          
         
      </div>
      <div className={style.lowerIcons}>
      <NavElement to="/dashboard" icon={dashBoardIcon} desc="Settings" active={active} setActive={setActive}/>
      <NavElement to="/dashboard" icon={dashBoardIcon} desc="Help" active={active} setActive={setActive}/>
      <NavElement to="/dashboard" icon={dashBoardIcon} desc="Log-Out" active={active} setActive={setActive}/>
      </div>
       
    </nav>
       
    </>
  )

  
}
