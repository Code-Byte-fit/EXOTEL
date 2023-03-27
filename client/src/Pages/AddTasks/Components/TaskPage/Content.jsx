import React, { useState } from "react";
import style from "./HKstyle.module.css";
import TaskAddSection from "./TaskAddSection";
import TaskEditDeleteTableSection from "./TaskEditDeleteTableSection";

const Content = () => {
  const [editTask, setEditTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEditTask = (task) => {
    setEditTask(task);
  };
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <div className={style.content}>
      <TaskAddSection taskToEdit={editTask} onRefresh={handleRefresh} />
      <TaskEditDeleteTableSection
        onEditTask={handleEditTask}
        refresh={refresh}
      />
    </div>
  );
};

export default Content;
