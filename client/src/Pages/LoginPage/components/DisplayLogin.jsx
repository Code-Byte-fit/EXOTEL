import React from "react";
import style from '../components/Login.module.css'
import logo from '../Images/logo.png'
import exotel from '../Images/exotel.png'
import FormOne from "./FormOne";

function App() {
    return <div >
    <div class={style.container}>
        <div class={style.cont2}>
        <img src={exotel} height={100} width={145} className={style.exotel}/>
        <span className={style.lbl1}>Luxury,The Best You Can Get</span>
        </div>
        <div class={style.right}>
            <img src={logo} height={130} width={145} className={style.logo}/>
            <FormOne className={style.form} forgotlink="" term=""/>
        </div>
        </div>
    </div>
}

export default App;