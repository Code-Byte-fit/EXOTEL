import React, { useState, useEffect,useContext } from "react";
import {AppContext} from "../../../../Helpers/AppContext"
import styles from './UserList.module.css';
import axios from 'axios';
const UserList = () => {
  const {host}=useContext(AppContext)
  const [houseKeepingManagerCount, sethouseKeepingManagerCount] = useState(0);
  const [foManagerCount, setfoManagerCount] = useState(0);
  const [adminCount, setadminCount] = useState(0);
  const [roomBoyCount, setroomBoyCount] = useState(0);
  const [cashierCount, setcashierCount] = useState(0);
  const [receptionistCount, setreceptionistCount] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        
        const response = await axios.get(`${host}/admin/todayStats`);
        sethouseKeepingManagerCount(response.data.houseKeepingManagerCount);
        setfoManagerCount(response.data.foManagerCount);
        setadminCount(response.data.adminCount);
        setroomBoyCount(response.data.roomBoyCount);
        setcashierCount(response.data.cashierCount);
        setreceptionistCount(response.data.receptionistCount);
       
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Types</h2>
      <div className={styles.cardList}>
        <div className={styles.card}>
          <div className={styles.cardNumber}>{houseKeepingManagerCount}</div>
          <div className={styles.cardText}>Housekeeping Manager(s) </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardNumber}>{foManagerCount}</div>
          <div className={styles.cardText}>Front Office Manager(s)</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardNumber}>{receptionistCount}</div>
          <div className={styles.cardText}>Receptionist(s)</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardNumber}>{roomBoyCount}</div>
          <div className={styles.cardText}>Room Boy(s)</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardNumber}>{cashierCount}</div>
          <div className={styles.cardText}>Cashier(s)</div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
