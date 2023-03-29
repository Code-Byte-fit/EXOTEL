import React, { useState } from "react";
import style from "./RepairItemsStyle.module.css";
import ItemAddSection from "./RoomItemsAddSection";
import ItemEditDeleteTableSection from "./RoomItemEditDeleteTableSection";

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
      <ItemAddSection taskToEdit={editTask} onRefresh={handleRefresh} />
      <ItemEditDeleteTableSection
        onEditTask={handleEditTask}
        refresh={refresh}
      />
    </div>
  );
};

export default Content;
