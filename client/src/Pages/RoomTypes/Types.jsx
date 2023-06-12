import React, { useState, useEffect,useContext } from "react";
import { AppContext } from "../../Helpers/AppContext"
import Table from "./components/Table";
import FormOne from "./components/Form";
import style from '../RoomTypes/components/Types.module.css'
import axios from "axios";

function DisplayFormData() {
    const { host } = useContext(AppContext)
    const [listOfRoomTypes, setlistOfRoomTypes] = useState([]);

    useEffect(() => {
        axios.get(`${host}/roomtypes`).then((response) => {
            setlistOfRoomTypes(response.data);
            console.log(listOfRoomTypes)

        });
    }, []);

    const makeReq = async (formData) => {
        await axios.post(`${host}/roomtypes`, formData).then(() => {
            axios.get(`${host}/roomtypes`).then((response) => {
                setlistOfRoomTypes(response.data);
            });
        })
    }

    return (
        <React.Fragment>
            <div className={style.cover}>
                <FormOne makeReq={makeReq} />

                <Table  listOfRoomTypes={listOfRoomTypes} />
            </div>


        </React.Fragment>


    )

}
export default DisplayFormData;
