import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Content from "./RepairRequestPage/Content";
import Header from "./Header/Header";
import style from "../AddRepairRequests/RepairRequestPage/RepairRequeststyle.module.css";

const AddRepairRequestPage = () => {
  return (
    <div className={style.container}>
      <Header />
      <Content />
    </div>
  );
};

export default AddRepairRequestPage;
