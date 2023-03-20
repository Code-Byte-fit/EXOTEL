import React from 'react';
import styles from './UserList.module.css';

const UserList = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Types</h2>
      <div className={styles.cardList}>
        <div className={styles.card}>
          <div className={styles.cardNumber}>1</div>
          <div className={styles.cardText}>Housekeeping Manager(s) </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardNumber}>2</div>
          <div className={styles.cardText}>Front Office Manager(s)</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardNumber}>3</div>
          <div className={styles.cardText}>Receptionist(s)</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardNumber}>4</div>
          <div className={styles.cardText}>Room Boy(s)</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardNumber}>5</div>
          <div className={styles.cardText}>Cashier(s)</div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
