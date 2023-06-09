import React, { useState, useEffect } from "react";
import style from "./RoomItemViewstyle.module.css";
import axios from "axios";
import Table from "../../../General/Table/Table";
import { BsPencil, BsTrash } from "react-icons/bs";

const ItemsEditDeleteTableSection = ({ refresh, onEditItems }) => {
  const [itemData, setItemData] = useState([]);

  const viewItems = async () => {
    const response = await axios.get(
      `http://localhost:3001/roomItems/itemdetails/`
    );
    setItemData(response.data);
  };

  const handleEdit = (data) => {
    onEditItems(data);
  };

  const handleDelete = (data) => {};

  useEffect(() => {
    viewItems();
  }, []);

  useEffect(() => {
    viewItems();
  }, [refresh]);

  const getItemList = () => {
    return itemData;
  };

  const columns = [
    {
      name: "ROOM-ITEM-ID",
      selector: (row) => row.RoomItemNo,
      sortable: true,
    },
    {
      name: "ROOM-ITEM",
      selector: (row) => row.RoomItemName,
      sortable: true,
    },
    // {
    //   name: "ROOM-TYPES",
    //   selector:
    //   sortable: false,
    // },
    {
      name: "COST",
      selector: (row) => row.Cost,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>
            <BsPencil color="grey" />
          </button>
          <button onClick={() => handleDelete(row)}>
            <BsTrash color="grey" />
          </button>
        </>
      ),
      sortable: false,
    },
  ];

  return (
    <div className={style.divEditDeleteTableSection}>
      <div className={style.divTitleEditDelete}>EDIT/CANCEL TASK</div>

      <div class="class=table-responsive-lg" className={style.divTblEditDelete}>
        <Table
          columns={columns}
          data={getItemList()}
          height="80vh"
          pagination
        />
      </div>
    </div>
  );
};

export default ItemsEditDeleteTableSection;
