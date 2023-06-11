import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../Helpers/AppContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Common from '../General/Common';
import style from './Receptionist.module.css';
import Card from './components/Card';
import Spinner from '../../General/Spinner/Spinner';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import checkinIcon from '../../../Assets/Images/checkin.png';
import checkoutIcon from '../../../Assets/Images/checkout.png';
import stayoverIcon from '../../../Assets/Images/stayover.png';
import roomsIcon from '../../../Assets/Images/rooms.png';
import addIcon from '../../../Assets/Images/Add-Field.png';
import { Doughnut } from "react-chartjs-2";

const Receptionist = () => {
  const { host } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [todayStats, setTodayStats] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Rooms",
        data: [],
        backgroundColor: [
          "#75CC66", // Occupied rooms color (#22311E)
          "#D7D9D6", // Available rooms color (#898E80)
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  Chart.register(CategoryScale);

  useEffect(() => {
    setLoading(true);
    axios.get(`${host}/reservations/todayStats`).then((res) => {
      setTodayStats(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const totalRooms =
      todayStats.checkins +
      todayStats.stayovers +
      todayStats.checkouts +
      todayStats.availableRooms;

    const occupiedRooms = todayStats.checkins + todayStats.stayovers;

    setChartData({
      labels: ["Occupied", "Available"],
      datasets: [
        {
          label: "Rooms",
          data: [occupiedRooms, todayStats.availableRooms],
          backgroundColor: [
            "#22311E", // Occupied rooms color
            "#898E80", // Available rooms color
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
          ],
          borderWidth:0, 
        }
      ]
    });
  }, [todayStats]);

  return (
    <div className={style.Container}>
      {loading && <Spinner loading={loading} />}
      <Common>
        <div>
          <div className={style.rowOne}>
            <div className={style.addCard}>
              <span> Add Reservation</span>
              <Link to="/createReservation">
                <img src={addIcon} alt="Add Icon" className={style.addIcon} />
              </Link>
            </div>
            <Card img={checkinIcon} value={todayStats.checkins} desc="Arrivals" />
            <Card img={checkoutIcon} value={todayStats.checkouts} desc="Departures" />
            <Card img={stayoverIcon} value={todayStats.stayovers} desc="Stay-Overs" />
            <Card img={roomsIcon} value={todayStats.availableRooms} desc="Available Rooms" />
          </div>

          <div className={style.rowTwo}>
            <div className={style.chartCard}> 
              <span>Today's Occupancy</span>
              <div className={style.chart}>
                <Doughnut
                  data={chartData}
                  options={{
                    plugins: {
                      legend: false,
                      title: {display: false}
                    }}}/>
              </div>
              <div className={style.legendCont}>
                    <div className={style.legend}>
                      <span className={`${style.legendColor} ${style.available}`}></span>
                      <span>Available</span>
                    </div>
                    <div className={style.legend}> 
                      <span className={`${style.legendColor} ${style.occupied}`}></span>
                      <span>Occupied</span>
                    </div>  
              </div>
            </div>
            
          </div>
        </div>
      </Common>
    </div>
  );
};

export default Receptionist;
