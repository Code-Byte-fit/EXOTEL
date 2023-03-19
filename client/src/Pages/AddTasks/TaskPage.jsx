import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Content from "./Components/TaskPage/Content";
import Header from "./Components/Header/Header";
import style from "../AddTasks/Components/TaskPage/HKstyle.module.css";

const TaskPage = () => {
  return (
    <div className={style.container}>
      <Header />
      <Content />
    </div>
  );
};

export default TaskPage;
