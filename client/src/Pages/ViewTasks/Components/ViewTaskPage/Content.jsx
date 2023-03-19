import React from "react";
import style from "./RBTaskViewstyle.module.css";
import TaskEditDeleteTableSection from "./TaskEditDeleteTableSection";

const Content = () => {
  return (
    <div className={style.content}>
      <TaskEditDeleteTableSection />
    </div>
  );
};

export default Content;
