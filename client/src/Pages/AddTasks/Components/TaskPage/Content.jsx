import React from "react";
import style from "../TaskPage/HKstyle.module.css";
import TaskAddSection from "./TaskAddSection";
import TaskEditDeleteTableSection from "./TaskEditDeleteTableSection";

const Content = () => {
  return (
    <div className={style.content}>
      <TaskAddSection />
      <TaskEditDeleteTableSection />
    </div>
  );
};

export default Content;
