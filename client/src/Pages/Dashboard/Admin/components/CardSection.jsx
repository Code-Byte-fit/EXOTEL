import React from 'react';
import style from './CardSection.module.css';
import add from '../../../../Assets/Images/pluss.png'
import Dis from '../../../../Assets/Images/Discount.png'
import User from '../../../../Assets/Images/Users.png'
import Rooms from '../../../../Assets/Images/Bedroom.png'
function CardSection() {
  return (
    <div className={style.cardContainer}>
      <div className={style.card}>
        <div className={style.icon}>
          <img src={Rooms} className="fas fa-bed"></img>
        </div>
        <div className={style.number}>10</div>
        <div className={style.text}>Rooms Available</div>
      </div>
      <div className={style.card}>
        <div className={style.icon}>
          <img src={Dis} className="fas fa-bed"></img>
        </div>
        <div className={style.number}>15</div>
        <div className={style.text}>Promos Available</div>
      </div>
      <div className={style.card}>
        <div className={style.leftContainer}>
          <div className={style.icon}>
            <img src={User} className="fas fa-bed"></img>
          </div>
          <div className={style.number}>20</div>
          <div className={style.text}>Users</div>
        </div>
        <div className={style.rightContainer}>
          <div className={style.addButton}>
            <img src={add} className={style.plus}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
