import React, { useState, useEffect } from "react";
import Table from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import style from "./MPackage.module.css";
import axios from "axios";

function MTable({listOfMinibarPackage}) {
  
  const columns = [
    {
      name: "Package Name",
      selector: (row) => row.PackageName,
      sortable: true,
    },
    {
      name: "Package Items",
      selector: (row) =>
        row.PackageItems.map((item) => <div>{item["ItemName"]}</div>),
      sortable: true,
    },
    {
      name: "Package Value",
      selector: (row) => row.PackagePrice,
      sortable: true,
    },
    {
      selector: (row) => row,
      cell: (row) => <EditDelete />,
    },
  ];

  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Entries</label>
      <div className={style.tbl}>
        <div className={style.div3}>
          <Table
            columns={columns}
            data={listOfMinibarPackage}
            height="35vh"
          />
        </div>
      </div>
    </span>
  );
}
export default MTable;