

import Rooms from '../../../../Assets/Images/Bedroom.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './CardSection.module.css';
import add from '../../../../Assets/Images/pluss.png'
import Dis from '../../../../Assets/Images/Discount.png'
import User from '../../../../Assets/Images/Users.png'

function CardSection() {
  const [roomCount, setRoomCount] = useState(0);
  const [promoCount, setPromoCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        
        const response = await axios.get('http://localhost:3001/admin/todayStats');
        setRoomCount(response.data.roomCount);
        setPromoCount(response.data.promoCount);
        setUserCount(response.data.usersCount);
console.log(roomCount,promoCount, userCount)
console.log(response.data)
       
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={style.cardContainer} >
      <div className={style.card}>
        <div className={style.icon}>
          <img src={Rooms} className="fas fa-bed"></img>
        </div>
        <div className={style.number}>{roomCount}</div>
        <div className={style.text}>Rooms Available</div>
      </div>
      <div className={style.card}>
        <div className={style.icon}>
          <img src={Dis} className="fas fa-bed"></img>
        </div>
        <div className={style.number}>{promoCount}</div>
        <div className={style.text}>Promos Available</div>
      </div>
      <div className={`${style.card} ${style.card3}`}>
        <div className={style.leftContainer}>
          <div className={`${style.icon} ${style.addIcon}`}>
            <img src={User} className="fas fa-bed"></img>
          </div>
          <div className={`${style.number} ${style.addNum}`}>{userCount}</div>
          <div className={`${style.text} ${style.addText}`}>Users</div>
        </div>
        <div className={style.rightContainer}>
          <div className={style.addButton}>
          <a href="http://localhost:3000/register">
  <img src={add} className={style.plus} alt="Add user"></img>
</a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
