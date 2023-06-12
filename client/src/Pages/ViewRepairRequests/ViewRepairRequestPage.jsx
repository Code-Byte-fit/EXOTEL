import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./Components/Header/Header";
import Content from "./Components/ViewRepairRequestPage/Content";
import style from "./Components/ViewRepairRequestPage/RepairViewStyle.module.css";

const ViewTaskPage = () => {
  return (
    <div className={style.container}>
      <Header />
      <Content />
    </div>
  );
};

export default ViewTaskPage;
