import React, { useState } from "react";
import style from "../components/Laundry.module.css";
import axios from "axios";
// import sort from "../../../Assets/Images/sort.png";
// import editIcon from "../../../Assets/Images/Small FAB(1).png";
// import deleteIcon from "../../../Assets/Images/Small FAB.png";
import { useEffect } from "react";
// import Popup from "./Popup";

function LTable(props) {
  // const [listOfMinibar, setListOfMinibar] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMinibar, setSelectedMinibar] = useState(null);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/minibar")
  //   .then((response) => {
  //     setListOfMinibar(response.data);
  //   });
  // }, []);

  function handleEditClick(bar) {
    setSelectedMinibar(bar);
    setShowPopup(true);
  }

  function handleDeleteClick() {
    // Handle delete logic here
  }

  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Entries</label>

      <div className={style.tbl}>
        <span className={style.div3}>
          <form>
            <table className={style.tableOne}>
              <thead>
                <tr>
                  <th>
                    Minibar ID 
                    {/* <img src={sort} className={style.sort1} /> */}
                  </th>
                  <th>
                    Room Number
                    {/* <img src={sort} className={style.sort1} /> */}
                  </th>
                  <th>
                    Last Restocked
                    {/* <img src={sort} className={style.sort1} /> */}
                  </th>
                  <th>
                   Item Name
                   {/* <img src={sort} className={style.sort1} /> */}
                  </th>
                  <th>
                    Quantity
                    {/* <img src={sort} className={style.sort1} /> */}
                  </th>
                  <th>
                    Actions
                    {/* <img src={sort} className={style.sort1} /> */}
                  </th>
                </tr>
              </thead>

              {props.listOfMinibar.map((value, key) => {
                return (
                  <tbody key={key}>
                    <tr>
                      <td>{value.MinibarId}</td>
                      <td>{value.RoomNumber}</td>
                      <td>{value.LastRestocked}</td>
                      <td>{value.ItemName}</td>
                      <td>{value.Quantity}</td>
                      <td>
                        <button
                          type="button"
                          className={style.editBtn}
                          onClick={() => handleEditClick(value)}
                        >
                          {/* <img src={editIcon} alt="Edit" /> */}
                        </button>
                        <button
                          type="button"
                          className={style.deleteBtn}
                          onClick={handleDeleteClick}
                        >
                          {/* <img src={deleteIcon} alt="Delete" /> */}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </form>
        </span>
      </div>
    </span>
  );
}

export default LTable;
