import React from 'react'
import MultiLevelSelector from "react-select-multi-level"
import style from "../Components/AddOns.module.css"

export default function Filter(props) {
    const statusOptions = [
        {
          value: 'active',
          label: 'Active'
        },
        {
          value: 'cancelled',
          label: 'Cancelled'
        },
        {
          value: 'expired',
          label: 'Expired'
        },
        {
          value: 'Checked-In',
          label: 'Checked-In'
        },
        {
          value: 'Checked-Out',
          label: 'Checked-Out'
        },
      ];
    
      const Sources=[
        {
          value: 'Phone',
          label: 'Phone'
        },
        {
          value: 'Walk-In',
          label: 'Walk-In'
        },
      ]

      
  return (
    <>
         <div className={style.filter}>
          <div className={style.select}>
                <MultiLevelSelector
              options={[
                {
                  value: 'ReservationStatus',
                  label: 'Status',
                  options: statusOptions
                },
                {
                  value: 'Source',
                  label: 'Sources',
                  options: Sources
                },
              ]}
              onChange={values => props.setSelectedFilters(values.map(filter => ({ value: filter.value, options: filter.options })))}
            />
          </div>
                  <div className={style.inputs}>
                      <label for="name">Name</label>
                       <input id ="name" type="text" onChange={e => props.setSearchQuery(e.target.value)} />
                  </div>
                 
                  <div className={style.inputs}>
                      <label for="checkIn">Check-In</label>
                      <input type="date" id="checkIn" defaultValue={new Date().toISOString().slice(0, 10)} onChange={e => props.setCheckInQuery(e.target.value)} />
                  </div>
                  <div className={style.inputs}>
                    <label for="checkOut">Check-Out</label>
                    <input type="date" id="checkOut" onChange={e => props.setCheckOutQuery(e.target.value)} /> 
                  </div>
                   
    </div>
    </>
  )
}
