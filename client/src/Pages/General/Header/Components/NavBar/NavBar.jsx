import {React,useState} from 'react'
import NavBarIcon from "../../../../../Assets/Images/NavBarIcon.png"
import style from "./NavBar.module.css"

export default function NavBar() {
  

  const [active,setActive]=useState(false);
  const [burgerClass,setBurgerClass]=useState("unclicked")
  const [menuClass,setMenuClass]=useState("hidden");
  

  const updateMenu=()=>{
    if(!active){
        setBurgerClass("clicked")
        setMenuClass("visible")
    }
    else{
      setBurgerClass("unclicked")
      setMenuClass("hidden")
    }
  }

    
  return (
    <>
       <nav>
          <img src={NavBarIcon} className={style.icon} onClick={()=>setActive(!active)}/>
          
       </nav>
    </>
  )
}
