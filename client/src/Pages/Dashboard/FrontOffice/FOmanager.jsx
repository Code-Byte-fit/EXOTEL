import React from 'react';
import {CChartLine} from '@coreui/react-chartjs'
import Common from '../General/Common';
import style from '../FrontOffice/FOmanager.module.css';

const FOmanager = () => {
  return (
      <Common>
        <div className={style.Container}>
        <div className={style.leftPanel}>
          <div className={style.users}>
            <h4 className={style.userTopic}>Users</h4>
            <div class={style.cards}>
            <div class={style.cardRed}>
                <p class={style.tip}>Front Office Manager</p>
                
            </div>
            <div class={style.cardBlue}>
                <p class={style.tip}>HR Manager</p>
                
            </div>
            <div class={style.cardGreen}>
                <p class={style.tip}>Receptionist</p>
                
            </div>
        </div>
          <span className={style.user}>

          </span>
          <span className={style.user}>

          </span>
          <span className={style.user}>

          </span>
          </div>
          <div className={style.footer}>
            <span className={style.reservations}></span>
            <span className={style.ongoingPromotions}></span>
            <span className={style.ongoingPromotions}></span>
            </div>
        
        </div>
        <div className={style.rightPanel}>
        <div className={style.lineGraph}>
          <h5 className={style.graphHead}>Customer Arrivals in Last Three Months</h5>
        <CChartLine
              data={{
                labels: ['','1st Week', '2nd Week', '3rd Week', '4th Week','5th Week'],
                datasets: [
                  {
                    label: 'Reservations of May month',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: [0, 20, 12, 39, 20,17],
                  },
                  {
                    label: 'Reservations of April month',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    data: [0, 12, 28, 29, 10],
                  },
                  {
                    label: 'Reservations of March month',
                    backgroundColor: 'rgba(151, 200, 205, 0.2)',
                    borderColor: 'rgba(151, 200, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 200, 205, 1)',
                    pointBorderColor: '#fff',
                    data: [0, 8, 20, 25, 2,5],
                  },
                ],
              }}
            />
        </div>
        </div>
        </div>
      </Common>
   
  );
};

export default FOmanager;
