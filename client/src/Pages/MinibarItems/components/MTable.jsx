import React, { useState , useEffect} from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import EditMinibarItem from "./EditMinibarItem"
import style from "../components/Minibar.module.css";
import axios from "axios";

function MTable(props) {
  const [isDone, setIsDone] = useState(false);
  const [success,setSuccess]=useState(true);

  
  const handleDone = () => {
    setIsDone(false)
    axios.get("http://localhost:3001/Minibar/minibaritems").then((response) => {
      setlistOfMinibarItems(response.data)
    })
  }
   
  const [listOfMinibarItems, setlistOfMinibarItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/Minibar/minibarpackage").then((response) => {
      setlistOfMinibarItems(response.data);
    });
  }, []);

  const columns = [
   
    {
      name: 'Item Name',
      selector: row=>row.ItemName,
      sortable: true,
    },
    {
      name: 'Item Price ($)',
      selector: row=>row.ItemPrice,
      sortable: true,
    },

    {
      name: 'Description',
      selector: row=>row.addInfo,
      sortable: true,
    },
   
    {
      selector: row => row,
      cell:(row)=><EditDelete setlistOfMinibarItems={setlistOfMinibarItems} row={row} editOption isDone={isDone} handleDone={handleDone} success={success}
      editComponent={<EditMinibarItem values={row} setIsDone={setIsDone} setSuccess={setSuccess}  />}/> // specify the component that should be displayed in this column
    }
  ]
  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Entries</label>
      <div className={style.tbl}>
        <Table columns={columns} data = {props.listOfMinibarItems} height ='35vh'/>
        </div>
    </span>
  );
}

export default MTable;
