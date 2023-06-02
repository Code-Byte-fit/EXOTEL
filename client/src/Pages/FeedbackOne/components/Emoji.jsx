import React from 'react'
import style from "./PageOne.module.css"

export default function Emoji(props) {
  const isSelected = props.isSelected;

  return (
    <>
      <span className={style.emojiCont} onClick={props.onClick}>
        <img src={props.img} className={`${style.emoji} ${isSelected && style.selectedEmoji}`} />
        <p className={style.emojiDesc}>{props.desc}</p>
      </span>
    </>
  );
}
