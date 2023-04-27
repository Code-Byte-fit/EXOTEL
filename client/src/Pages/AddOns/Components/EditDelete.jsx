import React, { useState,useContext } from "react";
import {AppContext} from "../../../Helpers/AppContext"
import EditDelete from '../../General/Table/EditDelete'
import axios from 'axios';
import EditAddon from './EditAddon';

export default function RTEditDelete(props) {
  const {host}=useContext(AppContext)
  const [isDone, setIsDone] = useState(false);
  const row = props.row

  const handleDelete = (row) => {
    axios.delete(`${host}/addon`).then(() => {
      setIsDone(true)
    })
  }

  const handleDone = () => {
    setIsDone(false)
    axios.get(`${host}/addon`).then((response) => {
      props.setlistOfAddons(response.data)
    })
  }

  return (
    <>
      <EditDelete
        removeOption
        deleteHeading="Remove Add On"
        deleteBody="Are you sure you want to remove this Add-On?"
        onDelete={() => { handleDelete(row) }}
        isDone={isDone}
        editComponent={<EditAddon values={row} />}
      />
    </>
  )
}