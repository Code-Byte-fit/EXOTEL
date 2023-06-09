import React from "react";
import style from "./RoomItemViewstyle.module.css";
import ItemsEditDeleteTableSection from "./ItemsEditDeleteTableSection";

const Content = () => {
  return (
    <div className={style.content}>
      <ItemsEditDeleteTableSection />
    </div>
  );
};

export default Content;
