import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "./Components/Header/Header";
import Content from "./Components/ViewRoomItems/Content";
import style from "./Components/ViewRoomItems/RoomItemViewstyle.module.css";

const ViewRoomItems = () => {
  return (
    <div className={style.container}>
      <Header />
      <Content />
    </div>
  );
};

export default ViewRoomItems;
