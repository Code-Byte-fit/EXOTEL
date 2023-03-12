import React from 'react'
import MultiLevelSelector from "react-select-multi-level"
import style from "../Style.module.css"

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
                }
              ]}
              value={[props.selectedFilters]}
              onChange={values => props.setSelectedFilters(values.map(filter => ({ value: filter.value, options: filter.options })))}
              hasSelectAll={false}
            />
    </div>
    </>
  )
}
