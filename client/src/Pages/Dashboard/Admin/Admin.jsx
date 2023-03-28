import React from 'react'
import Common from '../General/Common'
import style from './Admin.module.css'
import CardSection from './components/CardSection'
import UserList from './UserList/UserList'

const Admin = () => {
  return (
    <div className={style.Container}>
     <Common>
      
            <div className={style.leftPanel}> 
                <UserList /> 
            </div>
            <div className={style.rightPanel}>
                <CardSection />
            </div>
       
     </Common>
     
      </div>
 
  )
}

export default Admin

