import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import LogoImg from "../../../Assets/Logos/logo white.png"
import SearchBar from './Components/SearchBar/SearchBar'
import HotelStatus from './Components/Hotel Status/HotelStatus'
import Notification from './Components/Notification/Notification'
import UserCard from './Components/UserCard/UserCard'
import style from './Components/Header.module.css'

export default function Header() {
  return (
    <>
  <header className={style.header}>
       <NavBar/>
       <img src={LogoImg} className={style.logo}/>
       <SearchBar/>
       <div className={style.headerRight}>
          <HotelStatus/>
          <Notification/>
          <UserCard/>
       </div>
  </header>
    </>
    
  )
}
