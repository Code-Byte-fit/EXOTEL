import React from 'react';
import Worst from '../../../Assets/Images/veryBad.png'
import Poor from '../../../Assets/Images/poor.png'
import Good from '../../../Assets/Images/good.png'
import Average from '../../../Assets/Images/medium.png'
import Excellent from '../../../Assets/Images/exellent.png'
import Style from '../Components/Cards.module.css'

function Card({ emoji, hospitality, hygiene, food, facilities, rooms, guest }) {
  const emojiIcon = ()=>{
    //emoji==="Good" && return Good
  }
  return (
    <div className={Style.Card}>
      <div>
        <p className={Style.guest}>Guest : {guest}</p>
        <img src={
          (emoji==="Good" && Good) ||
          (emoji==="Worst" && Worst) ||
          (emoji==="Poor" && Poor) ||
          (emoji==="Average" && Average) ||
          (emoji==="Excellent" && Excellent) 
          } alt="Emoji" />
      </div>
      <div>
        <p>Hospitality: {hospitality}</p>
        <p>Hygiene: {hygiene}</p>
        <p>Food: {food}</p>
        <p>Facilities: {facilities}</p>
        <p>Rooms: {rooms}</p>
      </div>
    </div>
  );
}

export default Card;
