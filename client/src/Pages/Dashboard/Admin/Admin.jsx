import React from 'react'
import Common from '../General/Common'
import style from '../Admin/Admin.module.css'
import CardSection from './components/CardSection'
import UserList from './UserList/UserList'

const Admin = () => {
  return (
    <div className={style.Container}>
    
     <Common>
     <CardSection />
     </Common>
        {/* <UserList /> */}
      </div>
 
  )
}

export default Admin

