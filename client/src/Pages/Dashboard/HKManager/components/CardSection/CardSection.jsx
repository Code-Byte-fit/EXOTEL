import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../../Helpers/AppContext";
import Rooms from "../../../../../Assets/Images/Bedroom.png";
import axios from "axios";
import style from "./CardSection.module.css";
import add from "../../../../../Assets/Images/pluss.png";
import Dis from "../../../../../Assets/Images/Discount.png";
import User from "../../../../../Assets/Images/Users.png";

function CardSection() {
  const { host } = useContext(AppContext);
  const [taskCount, setTaskCount] = useState(0);
  const [repairCount, setRepairCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("abcdefff");
        const response = await axios.get(`${host}/HKManager/taskCount`);
        setTaskCount(response.data.taskCount);
        setRepairCount(response.data.repairCount);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
    console.log("asdasdasdasdads");
  }, []);

  return (
    <div className={style.cardContainer}>
      {/* <div className={style.card}>
        <div className={style.icon}>
          <img src={Rooms} className="fas fa-bed"></img>
        </div>
        <div className={style.number}>{taskCount}</div>
        <div className={style.text}>Rooms Available</div>
      </div> */}
      {/* <div className={style.card}>
        <div className={style.icon}>
          <img src={Dis} className="fas fa-bed"></img>
        </div>
        <div className={style.number}>{taskCount}</div>
        <div className={style.text}>Promos Available</div>
      </div> */}
      <div className={`${style.card} ${style.card3}`}>
        <div className={style.leftContainer}>
          <div className={`${style.icon} ${style.addIcon}`}>
            <img src={User} className="fas fa-bed"></img>
          </div>
          <div className={`${style.number} ${style.addNum}`}>{repairCount}</div>
          <div className={`${style.text} ${style.addText}`}>Repairs</div>
        </div>
        <div className={style.rightContainer}>
          <div className={style.addButton}>
            <Link to="/addRepairRequests">
              <img src={add} className={style.plus} alt="Add Repairs" />
            </Link>
          </div>
        </div>
      </div>
      <div className={`${style.card} ${style.card3}`}>
        <div className={style.leftContainer}>
          <div className={`${style.icon} ${style.addIcon}`}>
            <img src={User} className="fas fa-bed"></img>
          </div>
          <div className={`${style.number} ${style.addNum}`}>{taskCount}</div>
          <div className={`${style.text} ${style.addText}`}>Tasks</div>
        </div>
        <div className={style.rightContainer}>
          <div className={style.addButton}>
            <Link to="/addTasks">
              <img src={add} className={style.plus} alt="Add tasks" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
