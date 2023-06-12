import React,{useContext} from 'react'
import {AppContext} from "../../../../Helpers/AppContext"
import style from './components/Welcome.module.css'
import image from '../../../../Assets/Images/Banner-Image.png'


const WelcomeBar = () => {
    const {authState}=useContext(AppContext);
    return (
            <div className={style.headerSection}>
                <div className={style.cardSection}>
                    <img src={image} className={style.img} alt='f'></img>
                </div>
                <div className={style.title}>
                    <p className={style.para}>Hi, {authState.FirstName} {authState.LastName} </p>
                    <h1 className={style.head}>Welcome to EXOTEL</h1>
                 </div>
                </div>

      
    )
}

export default WelcomeBar;
