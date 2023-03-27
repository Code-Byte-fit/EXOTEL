import React, { useState } from "react";
import style from "./HKstyle.module.css";
import TaskAddSection from "./TaskAddSection";
import TaskEditDeleteTableSection from "./TaskEditDeleteTableSection";

const Content = () => {
  const [editTask, setEditTask] = useState(null);

  const handleEditTask = (task) => {
    setEditTask(task);
  };
  return (
    <div className={style.content}>
      <TaskAddSection taskToEdit={editTask} />
      <TaskEditDeleteTableSection onEditTask={handleEditTask} />
    </div>
  );
};

export default Content;
