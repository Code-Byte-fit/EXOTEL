import React from "react";
import style from "./RepairViewStyle.module.css";
import RepairEditDeleteTableSection from "./RepairEditDeleteTableSection";

const Content = () => {
  return (
    <div className={style.content}>
      <RepairEditDeleteTableSection />
    </div>
  );
};

export default Content;
