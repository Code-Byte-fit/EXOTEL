import React, { useState } from "react";
import style from "./Rooms.module.css";
import axios from "axios";
import sort from "../../../Assets/Images/sort.png";
import editIcon from "../../../Assets/Images/Small FAB(1).png";
import deleteIcon from "../../../Assets/Images/Small FAB.png";
import { useEffect } from "react";
import Popup from "./EditPopup";

function Table({ room }) {
  const [listOfRooms, setlistOfRooms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/rooms").then((response) => {
      setlistOfRooms(response.data);
    });
  }, []);

  function handleEditClick(room) {
    setSelectedRoom(room);
    setShowPopup(true);
  }

  function handleDeleteClick() {
    // Handle delete logic here
  }

  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Edit/Delete Room</label>

      <div className={style.tbl}>
        <span className={style.div3}>
          <form>
            <table className={style.tableOne}>
              <thead>
                <tr>
                  <th>
                    Room Number <img src={sort} className={style.sort1} />
                  </th>
                  <th>
                    Room Type<img src={sort} className={style.sort1} />
                  </th>
                  <th>
                    Base Charge<img src={sort} className={style.sort1} />
                  </th>
                  <th>
                    Floor<img src={sort} className={style.sort1} />
                  </th>
                  <th>
                    Sq.Feet<img src={sort} className={style.sort1} />
                  </th>
                  <th>
                    Actions<img src={sort} className={style.sort1} />
                  </th>
                </tr>
              </thead>

              {listOfRooms.map((value, key) => {
                return (
                  <tbody key={key}>
                    <tr>
                      <td>{value.RoomNo}</td>
                      <td>{value.TypeName}</td>
                      <td>{value.BaseCharge}</td>
                      <td>{value.floor}</td>
                      <td>{value.sqFeet}</td>
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
          room={selectedRoom}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </span>
  );
}

export default Table;
