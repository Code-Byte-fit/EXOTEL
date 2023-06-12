import React, { useState, useContext , useEffect } from 'react';
import { AppContext } from "../../../Helpers/AppContext"
import Common from '../General/Common'
import style from './Admin.module.css'
import CardSection from './components/CardSection'
import UserList from './UserList/UserList'
import axios from 'axios';
import Spinner from '../../General/Spinner/Spinner';

const Admin = () => {
  const [loading, setLoading] = useState(false); 
  const [promoStats, setPromoStats] = useState([]);
  const { host } = useContext(AppContext);
  useEffect(() => {
    setLoading(true)
    // Fetch active promotions from the server
    axios.get(`${host}/admin/active`).then((res)=>{
      console.log(res.data)
      setPromoStats(res.data);
      setLoading(false);
    })    
  }, []);


  
  return (

    <>
     {loading && <Spinner loading={loading}/>}
        <div className={style.Container}>
     <Common>
      
            <div className={style.leftPanel}> 
                <UserList /> 
            </div>
            <div className={style.rightPanel}>
                <CardSection />
                <div className={style.promotioncard}>
                <div className={style.promoCont}>
                  <span className={style.promoHeading}>Active Promotions</span>
                  
                  <table className={style.promoTable}>
                  <thead>
                    <tr>
                      <th>Promo Code</th>
                      <th>Promo Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Max Uses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoStats.map((promo) => (
                      <tr key={promo.PromoCode}>
                        <td>{promo.PromoCode}</td>
                        <td>{promo.PromoType}</td>
                        <td>{promo.Startdate}</td>
                        <td>{promo.Enddate}</td>
                        <td>{promo.MaxUses}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  
                </div>
            </div>
            </div>
       
     </Common>
     
      </div>
    </>
  
 
  )
}

export default Admin

