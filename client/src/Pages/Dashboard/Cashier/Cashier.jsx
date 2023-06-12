import React from 'react'
import Common from '../General/Common'
import Side from './components/Side'
import style from './Cashier.module.css'
import Card from './components/Card'

const Cashier = () => {
  return (
    <div className={style.Container}>
     <Common>
      
            <div className={style.leftPanel}> 
               <Card/>
            </div>
            <div className={style.rightPanel}>
            <Side/>
            </div>
       
     </Common>
     
      </div>
  )
}

export default Cashier
