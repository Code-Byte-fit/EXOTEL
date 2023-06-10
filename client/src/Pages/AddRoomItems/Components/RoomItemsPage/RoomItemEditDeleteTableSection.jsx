import React, { useState, useEffect, useContext } from "react";
import style from "./RoomItemsStyle.module.css";
import axios from "axios";
import Table from "../../../General/Table/Table";
import EditDelete from "../../../General/Table/EditDelete";
import Spinner from "../../../General/Spinner/Spinner";
import { AppContext } from "../../../../Helpers/AppContext";
import Edit from "./Edit";

const RoomItemEditDeleteTableSection = ({ refresh, onEditItems }) => {
  const { host } = useContext(AppContext);
  const [success, setSuccess] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`${host}/roomItems`).then((res) => {
      setItems(res.data);
      setLoading(false);
    });
  }, []);

  const handleDone = () => {
    setIsDone(false);
    setLoading(true);
    axios.get(`${host}/roomItems`).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  };

  const [itemData, setItemData] = useState([]);

  // const viewItems = async () => {
  //   const response = await axios.get(
  //     `http://localhost:3001/roomItems/itemdetails/`
  //   );
  //   setItemData(response.data);
  // };

  // const handleEdit = (data) => {
  //   onEditItems(data);
  // };

  // const handleDelete = (data) => {};

  // useEffect(() => {
  //   viewItems();
  // }, []);

  useEffect(() => {
    handleDone();
  }, [refresh]);

  // const getItemList = () => {
  //   return itemData;
  // };

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
      selector: (row) => row,
      cell: (row) => (
        <EditDelete
          editOption
          isDone={isDone}
          handleDone={handleDone}
          setIsDone={setIsDone}
          success={success}
          editComponent={
            <Edit values={row} setIsDone={setIsDone} setSuccess={setSuccess} />
          }
        />
      ),
    },
  ];

  return (
    <div className={style.divEditDeleteTableSection}>
      {loading && <Spinner loading={loading} />}
      <div className={style.divTitleEditDelete}>EDIT/CANCEL ROOM ITEM</div>

      <div class="class=table-responsive-lg" className={style.divTblEditDelete}>
        <Table columns={columns} data={items} height="48vh" pagination />
      </div>
    </div>
  );
};

export default RoomItemEditDeleteTableSection;
