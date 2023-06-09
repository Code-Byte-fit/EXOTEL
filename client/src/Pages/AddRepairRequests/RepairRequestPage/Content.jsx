import React, { useState } from "react";
import style from "./RepairRequeststyle.module.css";
import RepairRequestAddSection from "./RepairRequestAddSection";
import RepairRequestEditDeleteTableSection from "./RepairRequestEditDeleteTableSection";

const Content = () => {
  const [editRequest, setEditRequest] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEditRequest = (task) => {
    setEditRequest(task);
  };
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <div className={style.content}>
      <RepairRequestAddSection
        requestToEdit={editRequest}
        onRefresh={handleRefresh}
      />
      <RepairRequestEditDeleteTableSection
        onEditRequest={handleEditRequest}
        refresh={refresh}
      />
    </div>
  );
};

export default Content;
