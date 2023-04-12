import React, { useState, useEffect } from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import axios from "axios";
import style from "../components/Payments.module.css";

export default function Button(props) {
    const [isLeftActive, setIsLeftActive] = useState(true);
    const [columns, setColumns] = useState([]);
    const [listOfReservations, setListOfReservations] = useState([]);

    const handleLeftClick = () => {
        setIsLeftActive(true);
        setColumns(columnsL);
    };

    const handleRightClick = () => {
        setIsLeftActive(false);
        setColumns(columnsR);
    };

    useEffect(() => {
        axios.get("http://localhost:3001/reservations")
        .then((response) => {
            setListOfReservations(response.data);
        });
    }, []);

    const columnsL = [
        {
            name: 'Res Number',
            selector: row=>row.restId,
            sortable: true,
        },
        {
            name: 'Check In',
            selector: row=>row.CheckIn,
            sortable: true,
        },
        {
            name: 'Check Out',
            selector: row=>row.CheckOut,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row=>row.totalAmount,
            sortable: true,
        },
   
        {
            selector: row => row,
            cell:(row)=><EditDelete/>
        }
    ];

    const columnsR = [
        {
            name: 'Res Number',
            selector: row=>row.restId,
            sortable: true,
        },
   
        {
            name: 'Amount',
            selector: row=>row.grossAmount,
            sortable: true,
        },
   
        {
            selector: row => row,
            cell:(row)=><EditDelete/>
        }
    ];

    return (
        <>
            <div className={style.comb}>
                <div className={style['button-container']}>
                    <button
                        className={`${style['left-button']} ${isLeftActive ? style.active : ''}`}
                        onClick={handleLeftClick}
                        disabled={isLeftActive}
                    >Due</button>
                    <button
                        className={`${style['right-button']} ${!isLeftActive ? style.active : ''}`}
                        onClick={handleRightClick}
                        disabled={!isLeftActive}
                    >Payments</button>
                </div>
      
                <div className={style.tbl}>
                    <span className={style.div3}>
                        <Table columns={columns} data={isLeftActive ? listOfReservations : props.listOfBill} height='35vh' />
                    </span>
                </div>
            </div>
        </>
    )
}
