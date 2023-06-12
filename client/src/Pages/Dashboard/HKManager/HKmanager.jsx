import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext";
import Common from "../General/Common";
import style from "./HKmanager.module.css";
import axios from "axios";
import CardSection from "./components/CardSection/CardSection";
import { PieChart } from "react-minimal-pie-chart";

const HKmanager = () => {
  const [repairDoneCount, setRepairDoneCount] = useState(0);
  const [repairWaitCount, setRepairWaitCount] = useState(0);
  const dataMock = [
    { title: "Done", value: repairDoneCount, color: "#969771d5" },
    {
      title: "Waiting",
      value: repairWaitCount,
      color: "#4d5949",
      label: "hello",
    },
  ];

  const defaultLabelStyle = {
    fontSize: "7px",
    fontFamily: "sans-serif",
    color: "white",
    fontWeight: "bold",
  };
  const { host } = useContext(AppContext);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${host}/HKManager/repairCount`);
        setRepairDoneCount(response.data.repairDoneCount);
        setRepairWaitCount(response.data.repairWaitCount);
        // console.log("repair done count", repairDoneCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={style.Container}>
      <Common>
        <div className={style.fullPanel}>
          <div className={style.leftPanel}>
            <div className={style.piechart}>
              <span className={style.repairtitle}>Repair Request Status</span>{" "}
              {/* <PieChart 
                data={[
                  { title: "Done", value: repairDoneCount, color: "#969771d5" },
                  {
                    title: "Waiting",
                    value: repairWaitCount,
                    color: "#4d5949",
                    label: "hello",
                  },
                ]}
              /> */}
              <PieChart
                data={dataMock}
                label={({ dataEntry }) =>
                  Math.round(dataEntry.percentage) + "%"
                }
                labelStyle={defaultLabelStyle}
              />
              <div>
                <span className={style.colorBox1}>aa</span>
                <span> Waiting requests</span>
              </div>
              <div>
                <span className={style.colorBox2}>aa</span>
                <span> Completed Requests</span>
              </div>
            </div>
          </div>
          <div className={style.rightPanel}>
            <div className={style.cardPanel}>
              <CardSection />
            </div>
            <div className={style.feedbackPanel}></div>
          </div>
        </div>
      </Common>
    </div>
  );
};

export default HKmanager;
