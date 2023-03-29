import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Content from "./Components/RepairItemsPage/Content";
import Header from "./Components/Header/Header";
import style from "../RepairItems/Components/RepairItemsPage/RepairItemsStyle.module.css";

const RepairItemsPage = () => {
  return (
    <div className={style.container}>
      <Header />
      <Content />
    </div>
  );
};

export default RepairItemsPage;
