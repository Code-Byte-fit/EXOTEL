import {React,useState,useRef,useEffect,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import { AppContext } from '../../../../../Helpers/AppContext';
import NavElement,{MultiElement} from './Components/NavElement';
import dashBoardIcon from "../../../../../Assets/Images/Dashboard.png"
import LogoutIcon from "../../../../../Assets/Images/Logout Rounded Up.png"
import MiniIcon from "../../../../../Assets/Images/Mini Bar.png"
import MiniItemsIcon from "../../../../../Assets/Images/minibar items.png"
import MiniPckIcon from "../../../../../Assets/Images/mini bar package.png"
import ResIcon from "../../../../../Assets/Images/Reservation.png"
import RTIcon from "../../../../../Assets/Images/Room type.png"
import RoomIcon from "../../../../../Assets/Images/Room sub.png"
import GuestIcon from "../../../../../Assets/Images/user sub.png"
import UserIcon from "../../../../../Assets/Images/users main.png"
import UserIcon2 from "../../../../../Assets/Images/Add User.png"
import PromIcon from "../../../../../Assets/Images/promo.png"
import AddIcon from "../../../../../Assets/Images/addon.png"
import RoomMIcon from "../../../../../Assets/Images/Room main.png"
import ViewIcon from "../../../../../Assets/Images/view.png"
import ViewTIcon from "../../../../../Assets/Images/view task.png"
import LaunIcon from "../../../../../Assets/Images/laundary.png"
import CalIcon from "../../../../../Assets/Images/calendar.png"
import CRIcon from "../../../../../Assets/Images/create res.png"
import RMIcon from "../../../../../Assets/Images/create task.png"



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
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
      <MultiElement desc="Rooms" icon={RoomMIcon} isActive={activeIndex === 0} onClick={() => handleMultiElementClick(0)}>
        <NavElement to="/roomtypes" icon={RTIcon} desc="Room Types" active={active} setActive={setActive}/>
        <NavElement to="/rooms" icon={RoomIcon} desc="Rooms" active={active} setActive={setActive}/>
      </MultiElement>
      <MultiElement desc="Users" icon={UserIcon} isActive={activeIndex === 1} onClick={() => handleMultiElementClick(1)}>
        <NavElement to="/register" icon={UserIcon2} desc="Register User" active={active} setActive={setActive}/>
        <NavElement to="/userlist" icon={GuestIcon} desc="Users List" active={active} setActive={setActive}/>
      </MultiElement>
      <NavElement to="/reservationTab" icon={ResIcon} desc="Reservations" active={active} setActive={setActive}/>
      <NavElement to="/guests" icon={GuestIcon} desc="Guests" active={active} setActive={setActive}/>
      <NavElement to="/promotion" icon={PromIcon} desc="Promotions" active={active} setActive={setActive}/>
      <NavElement to="/addons" icon={AddIcon} desc="Add-ons" active={active} setActive={setActive}/>
      <NavElement to="/calender" icon={CalIcon} desc="Calendar" active={active} setActive={setActive}/>
      </>}

      {authState.userRole==="FOManager" && 
      <>
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
      <MultiElement desc="View" icon={ViewIcon} isActive={activeIndex === 2} onClick={() => handleMultiElementClick(2)}>
        <NavElement to="/reservationTab" icon={ResIcon} desc="Reservations" active={active} setActive={setActive}/>
        <NavElement to="/viewroomtypes" icon={RTIcon} desc="Room-Types" active={active} setActive={setActive}/>
        <NavElement to="/viewRooms" icon={RoomIcon} desc="Rooms" active={active} setActive={setActive}/>
        <NavElement to="/guests" icon={GuestIcon} desc="Guests" active={active} setActive={setActive}/>
        <NavElement to="/viewPromotions" icon={PromIcon} desc="Promotions" active={active} setActive={setActive}/>
        <NavElement to="/viewaddons" icon={AddIcon} desc="Add-Ons" active={active} setActive={setActive}/>
      </MultiElement>
      <NavElement to="/calender" icon={CalIcon} desc="Calendar" active={active} setActive={setActive}/>
      </>}

      {authState.userRole==="Cashier" && 
      <>
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
      <NavElement to="/payments" icon={ViewTIcon} desc="Payments" active={active} setActive={setActive}/>
      <MultiElement desc="View" icon={ViewIcon} isActive={activeIndex === 3} onClick={() => handleMultiElementClick(3)}>
        <NavElement to="/reservationTab" icon={ResIcon} desc="Reservations" active={active} setActive={setActive}/>
        <NavElement to="/viewroomtypes" icon={RTIcon} desc="Room Types" active={active} setActive={setActive}/>
        <NavElement to="/viewRooms" icon={RoomIcon} desc="Rooms" active={active} setActive={setActive}/>
        <NavElement to="/guests" icon={GuestIcon} desc="Guests" active={active} setActive={setActive}/>
        <NavElement to="/viewPromotions" icon={PromIcon} desc="Promotions" active={active} setActive={setActive}/>
        <NavElement to="/viewaddons" icon={AddIcon} desc="Add-Ons" active={active} setActive={setActive}/>
        <NavElement to="/ViewMRestock" icon={MiniIcon} desc="Minibar" active={active} setActive={setActive}/>
      </MultiElement>
      <NavElement to="/calender" icon={CalIcon} desc="Calendar" active={active} setActive={setActive}/>
      </>}

      {authState.userRole==="Receptionist" && 
      <>
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
       <MultiElement desc="Reservations" icon={RMIcon} isActive={activeIndex === 4} onClick={() => handleMultiElementClick(4)}>
         <NavElement to="/createReservation" icon={CRIcon} desc="Create" active={active} setActive={setActive}/>
         <NavElement to="/reservationTab" icon={ResIcon} desc="Details" active={active} setActive={setActive}/>
      </MultiElement>
      <MultiElement desc="View" icon={ViewIcon} isActive={activeIndex === 5} onClick={() => handleMultiElementClick(5)}>
          <NavElement to="/viewroomtypes" icon={RTIcon} desc="Room Types" active={active} setActive={setActive}/>
          <NavElement to="/viewRooms" icon={RoomIcon} desc="Rooms" active={active} setActive={setActive}/>
          <NavElement to="/viewPromotions" icon={PromIcon} desc="Promotions" active={active} setActive={setActive}/>
          <NavElement to="/viewaddons" icon={AddIcon} desc="Add-Ons" active={active} setActive={setActive}/>
      </MultiElement>
      <NavElement to="/guests" icon={GuestIcon} desc="Guests" active={active} setActive={setActive}/>
      <NavElement to="/calender" icon={CalIcon} desc="Calendar" active={active} setActive={setActive}/>
      </>}

      {authState.userRole==="RoomBoy" && 
      <>
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
      <NavElement to = "/minibarRestocked" icon={MiniIcon} desc="Minibar" active={active} setActive={setActive}/>
      <NavElement to = "/laundry" icon={LaunIcon} desc="Laundry" active={active} setActive={setActive}/>
      <NavElement to="/calender" icon={CalIcon} desc="Calendar" active={active} setActive={setActive}/>
      </>}

      
      {authState.userRole==="HKManager" && 
      <>
      <NavElement to="/" icon={dashBoardIcon} desc="Dashboard" active={active} setActive={setActive}/>
      <MultiElement desc="Minibar" icon={MiniIcon} isActive={activeIndex === 6} onClick={() => handleMultiElementClick(6)}>
        <NavElement to = "/minibarItems" icon={MiniItemsIcon} desc="Items" active={active} setActive={setActive}/>
        <NavElement to = "/minibarPackage" icon={MiniPckIcon} desc="Package" active={active} setActive={setActive}/> 
      </MultiElement>
      <MultiElement desc="View" icon={ViewIcon} isActive={activeIndex === 3} onClick={() => handleMultiElementClick(3)}>
        <NavElement to="/reservationTab" icon={ResIcon} desc="Reservations" active={active} setActive={setActive}/>
        <NavElement to="/viewroomtypes" icon={RTIcon} desc="Room Types" active={active} setActive={setActive}/>
        <NavElement to="/viewRooms" icon={RoomIcon} desc="Rooms" active={active} setActive={setActive}/>
        <NavElement to="/guests" icon={GuestIcon} desc="Guests" active={active} setActive={setActive}/>
        <NavElement to="/viewPromotions" icon={PromIcon} desc="Promotions" active={active} setActive={setActive}/>
        <NavElement to="/viewaddons" icon={AddIcon} desc="Add-Ons" active={active} setActive={setActive}/>
      </MultiElement>
      <NavElement to = "/laundry" icon={LaunIcon} desc="Laundry" active={active} setActive={setActive}/>
      <NavElement to="/calender" icon={CalIcon} desc="Calendar" active={active} setActive={setActive}/>
      </>}

      </div>
      <div className={style.lowerIcons}>
        {/* <NavElement to="/dashboard" icon={dashBoardIcon} desc="Settings" active={active} setActive={setActive}/>
        <NavElement to="/dashboard" icon={dashBoardIcon} desc="Help" active={active} setActive={setActive}/> */}
        <div onClick={logout} className={style.logout}>
            <img src={LogoutIcon}/>
            <span>Log out</span>
        </div>
      </div>
       
    </nav>
       
    </>
  )

  
}



