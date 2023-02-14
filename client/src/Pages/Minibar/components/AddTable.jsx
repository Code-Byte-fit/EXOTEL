import React from 'react'
import style from '../components/Minibar.module.css'
// import { FaEdit } from "react-icons/fa";

export default function AddTable({contacts}) {
  return (
    
    <div class={style.area}>
    <label className={style.labelOne}>Entries</label>
    <div className={style.tbl}>
    <table class={style.tblOne}>
   
      <tr>
        {/* <th><label class={style.containerTwo}>
        <input type="checkbox" />   
        <div class={style.checkmark}></div>
        </label></th> */}
        <th>
          <input type="checkbox" className={style.checkOne}/>
        </th>
        <th>Minibar-ID</th>
        <th>Room No</th>
        <th>Last Restocked</th>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr> 
      <tbody>
      {contacts.map((contact)=>(
        <tr>
          {/* <td><label className={style.container}><input type="checkbox" />
          <div className={style.checkmark}></div></label></td> */}
          <td>
                <input type="checkbox" className={style.checkOne}/>

          </td>
         <td>{contact.id}</td>
          <td>{contact.roomNum}</td>
          <td>{contact.date}</td>
          <td>{contact.item}</td>
          <td>{contact.qty}</td>
          {/* <td><FaEdit/></td> */}
        </tr>
        
      ))} 
      </tbody>
      </table>
      </div>    
     
    </div>
  )
}
