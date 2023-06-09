import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Content from "./Components/RoomItemsPage/Content";
import Header from "./Components/Header/Header";
import style from "./Components/RoomItemsPage/RoomItemsStyle.module.css";

const RoomItemsPage = () => {
  return (
    <div className={style.container}>
      <Header />
      <Content />
    </div>
  );
};

export default RoomItemsPage;
