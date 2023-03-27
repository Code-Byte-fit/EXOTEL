import React, { useState } from "react";
import EditDelete from "../../../General/Table/EditDelete";
// import EditRes from './EditRes';
import axios from "axios";

export default function TaskEditDelete(props) {
  const [isDone, setIsDone] = useState(false);
  const handleEdit = (row) => {
    axios.put("http://localhost:3001/reservations").then(() => {
      setIsDone(true);
    });
  };

  const row = props.row;

  return (
    <>
      <EditDelete
        onEdit={() => handleEdit(row)}
        // onDelete={() => handleDelete(row)}
        deleteOption
      />
    </>
  );
}
