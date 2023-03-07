import React, { useState } from "react";
import style from "./AddOns.module.css"
import axios from 'axios';
import sort from "../../../Assets/Images/sort.png"
import editIcon from "../../../Assets/Images/Small FAB(1).png"
import deleteIcon from "../../../Assets/Images/Small FAB.png"
import { useEffect } from "react";
import Popup from "./EditPopup";
function Table({ addon }) {

    const [listOfAddons, setlistOfAddons] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAddon, setSelectedAddon] = useState(null);


   

    useEffect(() => {
        axios.get("http://localhost:3001/addons").then((response) => {
            setlistOfAddons(response.data);
        })
    }, [])

    function handleEditClick() {
        setShowPopup(true);
    }

    function handleDeleteClick() {
        // Handle delete logic here
    }

    return (
        <span className={style.tableContainer}>
            <label className={style.labelTwo}>Edit/Delete Add Ons</label>

            <div className={style.tbl}>
                <span className={style.div3}>
                    <form >
                        <table className={style.tableOne}>
                            <thead>
                                <tr>

                                    <th>Add On Number <img src={sort} className={style.sort1} /></th>
                                    <th>Add On<img src={sort} className={style.sort1} /></th>
                                    <th>Amount<img src={sort} className={style.sort1} /></th>
                                    <th>Actions<img src={sort} className={style.sort1} /></th>


                                </tr>
                            </thead>

                            {listOfAddons.map((value, key) => {
                                return (

                                    <tbody>
                                        <td>{value.AddOnNo}</td>
                                        <td>{value.AddOn}</td>
                                        <td>{value.Amt}</td>

                                        <td>
                                            <button
                                                type="button"
                                                className={style.editBtn}
                                                onClick={() => handleEditClick(value)}
                                            >
                                                <img src={editIcon} alt="Edit" />
                                            </button>
                                            <button
                                                type="button"
                                                className={style.deleteBtn}
                                                onClick={handleDeleteClick}
                                            >
                                                <img src={deleteIcon} alt="Delete" />
                                            </button>
                                        </td>
                                    </tbody>


                                );
                            })}
                        </table>
                    </form>
                </span>
            </div>
            {showPopup && (
                <Popup 
          room={selectedAddon}
          closePopup={() => setShowPopup(false)}
        />

            )}
        </span>

    )
}


export default Table;