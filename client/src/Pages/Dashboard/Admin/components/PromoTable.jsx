
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../Helpers/AppContext';

const PromoTable = () => {
    const { host } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [todayStats, setTodayStats] = useState([]);


  
  return (
    <div>
      
    </div>
  )
}

export default PromoTable
