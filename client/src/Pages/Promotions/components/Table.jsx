import React, { useState } from "react";
import style from "./Promotions.module.css"
import { useEffect } from "react";
import axios from 'axios';
import PromotionTable from '../../General/Table/Table'
import EditDelete from "../../General/Table/EditDelete";
import styled from 'styled-components';
import EditPromo from "./EditPromo";

function Table(props) {

    
    const [listOfPromotions, setlistOfPromotions] = useState([]);
    const [isDone, setIsDone] = useState(false);

    const handleDone=()=>{
      setIsDone(false)
      axios.get("http://localhost:3001/promotions").then((response)=>{
        setlistOfPromotions(response.data)
      })
    }
  

    useEffect(() => {
      axios.get('http://localhost:3001/promotions')
        .then((response) => {
          setlistOfPromotions(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      updateExpiredPromotions(); // Call the updateExpiredPromotions function here
    }, []);
  

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

  function updateExpiredPromotions() {
    axios.put("http://localhost:3001/promotions/updateExpired")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }


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
        {
          selector: row => row,
          cell: (row) => <EditDelete editComponent={<EditPromo  values={row} setIsDone={setIsDone}   />}  setlistOfPromotions={setlistOfPromotions} row={row} editOption  isDone={isDone} handleDone={handleDone}/>
        },
    ];
    
    return (

        <span className={style.tableContainer}>
            <label className={style.labelTwo}>Edit/Delete Promotions</label>
            <PromotionTable columns={columns} data={props.listOfPromotions} height="30vh" edit pagination/>
         
        </span>

    )
}


export default Table;