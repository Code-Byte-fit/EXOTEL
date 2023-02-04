import React from 'react'
import addIcon from "../../../Assets/Images/Add.png"
import sortIcon from "../../../Assets/Images/sort black.png"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import style from "./Style.module.css"

export default function ReservationsTable() {
  return (
    <>
    <div className={style.resTableContainer}>
           <div className={style.tableHeader}>
                <div className={style.headerLeft}>
                      <span className={style.heading}>RESERVATIONS</span>
                      <img src={addIcon} className={style.addIcon}/>
                </div>
                <div className={style.headerRight}>
                      <select className={`form-select ${style.select}`}>
                        <option value="today">Today</option>
                        <option value="tommorow">Tommorow</option>
                      </select>
                </div>
           </div>
           <div className='table-responsive'>
           <table className="table table- table-hover ">
        <thead>
            <tr>
                <th>RESERVATION-ID</th>
                <th>GUEST</th>
                <th>DATE BOOKED</th>
                <th>ROOM(S)</th>
                <th>CHECK-IN</th>
                <th>CHECK-OUT</th>
                <th>BASE-RATE</th>
                <th>STATUS</th>
                <th>SOURCE</th>
                <th>MADE-BY</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>001</td>
                <td>Shamly</td>
                <td>23/02/2020</td>
                <td>QR(2/5)(H),KR(3/11)(H)</td>
                <td>26/12/2022</td>
                <td>28/12/2022</td>
                <td>$70</td>
                <td>CONFIRMED</td>
                <td>WALK-IN</td>
                <td>SHAMLY</td>
            </tr>
            <tr>
                <td>001</td>
                <td>Shamly</td>
                <td>23/02/2020</td>
                <td>QR(2/5)(H),KR(3/11)(H)</td>
                <td>26/12/2022</td>
                <td>28/12/2022</td>
                <td>$70</td>
                <td>CONFIRMED</td>
                <td>WALK-IN</td>
                <td>SHAMLY</td>
            </tr>
        </tbody>
        </table>
           </div>
           
    </div>
        
    </>
  )
}
