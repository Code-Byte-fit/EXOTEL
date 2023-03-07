import React, { useState } from "react";
import style from "./Types.module.css";
import axios from "axios";
import sort from "../../../Assets/Images/sort.png";
import editIcon from "../../../Assets/Images/Small FAB(1).png";
import deleteIcon from "../../../Assets/Images/Small FAB.png";
import { useEffect } from "react";
import Popup from "./EditPopup";

function Table({ type }) {
  const [listOfRoomTypes, setlistOfRoomTypes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRoomType, setSelectedRoomTypes] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/roomtypes").then((response) => {
      setlistOfRoomTypes(response.data);
    });
  }, []);

  function handleEditClick(type) {
    setSelectedRoomTypes(type);
    setShowPopup(true);
  }

  function handleDeleteClick() {
    // Handle delete logic here
  }

  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Edit/Delete Room Types</label>

      <div className={style.tbl}>
        <span className={style.div3}>
          <form>
            <table className={style.tableOne}>
              <thead>
                <tr>
              
                  <th>
                    Room Type<img src={sort} className={style.sort1} />
                  </th>
                  <th>
                  No Of Beds<img src={sort} className={style.sort1} />
                  </th>
                  <th>
                  sqFeet<img src={sort} className={style.sort1} />
                  </th>
                  <th>
                  Base Charge<img src={sort} className={style.sort1} />
                  </th>
                  <th>
                    Actions<img src={sort} className={style.sort1} />
                  </th>
                </tr>
              </thead>

              {listOfRoomTypes.map((value, key) => {
                return (
                  <tbody key={key}>
                    <tr>
                      <td>{value.TypeName}</td>
                      <td>{value.NoOfBeds}</td>
                      <td>{value.sqFeet}</td>
                      <td>{value.BaseCharge}</td>
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
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </form>
        </span>
      </div>
      {showPopup && (
        
        <Popup 
          room={selectedRoomType}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </span>
  );
}

export default Table;
