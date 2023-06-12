import {React,useState,useRef,useEffect,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { AppContext } from '../../../../../Helpers/AppContext';
import NavElement,{MultiElement} from './Components/NavElement';
import dashBoardIcon from "../../../../../Assets/Images/Dashboard.png"
import style from "./Components/NavBar.module.css"

export default function NavBar(props) {
  const [active,setActive]=useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navMenuRef = useRef(null);
  const navContainerRef = useRef(null);
  const {authState,setAuthState}=useContext(AppContext)
  const navigate=useNavigate()

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

  const handleMultiElementClick = (index) => {
    if(activeIndex===index) setActiveIndex(-1)
    else setActiveIndex(index);
  };

  const logout=()=>{
    localStorage.removeItem("accessToken");
    setAuthState({userAccountId:0,
      userName:"",
      FirstName:"",
      LastName:"",
      userRole:"",
      proPic:"",
      status:false,});
    navigate("/login")
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
      {authState.userRole==="Administrator" && 
      <>
      <NavElement to="/dashBoard" icon={dashBoardIcon} desc="DashBoard" active={active} setActive={setActive}/>
      <MultiElement desc="Rooms" icon={dashBoardIcon} isActive={activeIndex === 0} onClick={() => handleMultiElementClick(0)}>
        <NavElement to="/roomtypes" icon={dashBoardIcon} desc="Room Types" active={active} setActive={setActive}/>
        <NavElement to="/rooms" icon={dashBoardIcon} desc="Rooms" active={active} setActive={setActive}/>
      </MultiElement>
      <MultiElement desc="Users" icon={dashBoardIcon} isActive={activeIndex === 1} onClick={() => handleMultiElementClick(1)}>
        <NavElement to="/register" icon={dashBoardIcon} desc="Register User" active={active} setActive={setActive}/>
        <NavElement to="/userlist" icon={dashBoardIcon} desc="Users List" active={active} setActive={setActive}/>
      </MultiElement>
      {/* <NavElement to="/register" icon={dashBoardIcon} desc="Register User" active={active} setActive={setActive}/>
      
      <NavElement to="/rooms" icon={dashBoardIcon} desc="Rooms" active={active} setActive={setActive}/>
      <NavElement to="/promotion" icon={dashBoardIcon} desc="Promotions" active={active} setActive={setActive}/>
      <NavElement to="/addons" icon={dashBoardIcon} desc="Add-Ons" active={active} setActive={setActive}/>
      <NavElement to="/guests" icon={dashBoardIcon} desc="Guests" active={active} setActive={setActive}/>
      <NavElement to="/reservationTab" icon={dashBoardIcon} desc="Reservations Tab" active={active} setActive={setActive}/> */}
      </>}

      {authState.userRole==="FOManager" && 
      <>
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
      <NavElement to="/reservationTab" icon={dashBoardIcon} desc="Reservations Tab" active={active} setActive={setActive}/>
      <NavElement to="/viewRooms" icon={dashBoardIcon} desc="Rooms" active={active} setActive={setActive}/>
      <NavElement to="/viewPromotions" icon={dashBoardIcon} desc="Promotions" active={active} setActive={setActive}/>
      <NavElement to="/viewaddons" icon={dashBoardIcon} desc="Add-Ons" active={active} setActive={setActive}/>
      <NavElement to="/viewroomtypes" icon={dashBoardIcon} desc="Room-Types" active={active} setActive={setActive}/>
      <NavElement to="/guests" icon={dashBoardIcon} desc="Guests" active={active} setActive={setActive}/>
      </>}

      {authState.userRole==="Cashier" && 
      <>
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
      <NavElement to="/reservationTab" icon={dashBoardIcon} desc="Reservations Tab" active={active} setActive={setActive}/>
      <NavElement to="/viewRooms" icon={dashBoardIcon} desc="Rooms" active={active} setActive={setActive}/>
      <NavElement to="/viewPromotions" icon={dashBoardIcon} desc="Promotions" active={active} setActive={setActive}/>
      <NavElement to="/viewaddons" icon={dashBoardIcon} desc="Add-Ons" active={active} setActive={setActive}/>
      <NavElement to="/viewroomtypes" icon={dashBoardIcon} desc="Room-Types" active={active} setActive={setActive}/>
      <NavElement to="/guests" icon={dashBoardIcon} desc="Guests" active={active} setActive={setActive}/>
      </>}

      {authState.userRole==="Receptionist" && 
      <>
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
       <MultiElement desc="Reservations" icon={dashBoardIcon} isActive={activeIndex === 3} onClick={() => handleMultiElementClick(3)}>
         <NavElement to="/createReservation" icon={dashBoardIcon} desc="Add Res" active={active} setActive={setActive}/>
         <NavElement to="/reservationTab" icon={dashBoardIcon} desc="Res-Tab" active={active} setActive={setActive}/>
      </MultiElement>
      <NavElement to="/guests" icon={dashBoardIcon} desc="Guests" active={active} setActive={setActive}/>
      <NavElement to="/calender" icon={dashBoardIcon} desc="Calender" active={active} setActive={setActive}/>
      </>}

      </div>
      <div className={style.lowerIcons}>
        {/* <NavElement to="/dashboard" icon={dashBoardIcon} desc="Settings" active={active} setActive={setActive}/>
        <NavElement to="/dashboard" icon={dashBoardIcon} desc="Help" active={active} setActive={setActive}/> */}
        <div onClick={logout} className={style.logout}>
            <img src={dashBoardIcon}/>
            <span>Logout</span>
        </div>
      </div>
       
    </nav>
       
    </>
  )

  
}



