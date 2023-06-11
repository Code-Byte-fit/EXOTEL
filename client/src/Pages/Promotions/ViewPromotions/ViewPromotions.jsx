import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import axios from 'axios';
import style from "../ViewPromotions/components/ViewPromotions.module.css";
import RoomTable from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";

import styled from 'styled-components';


function ViewRooms() {
  const { host } = useContext(AppContext);
    const [listOfPromotions, setlistOfPromotions] = useState([]);
    

    useEffect(() => {
        axios.get(`${host}/promotions`).then((response) => {
            setlistOfPromotions(response.data);
        })
    }, [])
    

    const StatusCell = styled.div`
    padding: 5px;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    text-align: center;
    ${({ status }) => {
      switch (status) {
        case 'Active':
          return 'background-color: pink;';
        case 'Disabled':
          return 'background-color: green;';
        case 'Expired':
          return 'background-color: blue;';
        default:
          return '';
      }
    }}
  `;

    const columns = [
        {
            name: 'Promo Code',
            selector: row => row.PromoCode,
            sortable: true,
        },
        {
            name: 'Promo Type',
            selector: row => row.PromoType,
            sortable: true,
        },
    
        {
          name: 'Value',
          selector: row => row.Value,
          sortable: true,
        },
        {
          name: 'Max Uses',
          selector: row => row.MaxUses,
          sortable: true,
        },
        {
          name: 'Status',
          selector: row => row.Status,
          sortable: true,
          cell: row => <StatusCell status={row.Status}>{row.Status}</StatusCell>,
        },
          {
            name: 'Start Date',
            selector: row => row.Startdate,
            sortable: true,
          },
          {
            name: 'End Date',
            selector: row => row.Enddate,
            sortable: true,
          },
          {
            name: 'Add Info',
            selector: row => row.AddInfo,
            sortable: true,
            cell: row => (
              <div className={style.tooltip}>
                {row.AddInfo}
                <span className={style.tooltipText}>{row.AddInfo}</span>
              </div>
            ),
          },
        
    ];

    return (
        <div className={style.tableContainer}>
            <div className={style.heading}>
                <h1>Available Promotions</h1>
            </div>
            <RoomTable columns={columns} data={listOfPromotions} height="150vh" pagination />
        </div>
    );
}

export default ViewRooms;
