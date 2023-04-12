import React, { useState, useEffect } from "react";
import Table from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import style from "./MPackage.module.css";
import axios from "axios";

function MTable(props) {
  // define the columns of the table
  const columns = [
    {
      name: "Package Name",
      selector: (row) => row.PackageName, // specify the key in the data object that this column should display
      sortable: true, // enable sorting for this column
    },
    {
      name: "Package Items",
      selector: (row) =>
        row.MiniBarItems.map((item) => <div>{item["ItemName"]}</div>), // specify the key in the data object that this column should display and format the output with a map function
      sortable: true, // enable sorting for this column
    },
    {
      name: "Package Value",
      selector: (row) => row.PackagePrice, // specify the key in the data object that this column should display
      sortable: true, // enable sorting for this column
    },
    {
      selector: (row) => row, // specify the key in the data object that this column should display
      cell: (row) => <EditDelete />, // specify the component that should be displayed in this column
    },
  ];

  // render the table with the specified columns and data
  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Entries</label>
      <div className={style.tbl}>
        <div className={style.div3}>
          <Table
            columns={columns} // pass in the columns that were defined above
            data={props.listOfMinibarPackage} // pass in the data that should be displayed in the table
            height="35vh" // set the height of the table
          />
        </div>
      </div>
    </span>
  );
}

export default MTable;
