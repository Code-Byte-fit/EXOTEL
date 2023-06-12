import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext";
import Common from "../General/Common";
import style from "./HKmanager.module.css";
import axios from "axios";
import CardSection from "./components/CardSection/CardSection";

const HKmanager = () => {
  // const { host } = useContext(AppContext);
  // const [roomBoyCount, setroomBoyCount] = useState(0);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(`${host}/admin/todayStats`);
  //       setroomBoyCount(response.data.roomBoyCount);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className={style.Container}>
      <Common>
        <div className={style.leftPanel}></div>
        <div className={style.rightPanel}>
          <CardSection />
        </div>
      </Common>
    </div>
  );
};

export default HKmanager;
