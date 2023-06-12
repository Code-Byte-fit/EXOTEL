import React, { useState, useEffect,useContext } from "react";
import { AppContext } from "../../Helpers/AppContext"
import Table from "./components/Table";
import FormOne from "./components/Form";
import style from '../RoomTypes/components/Types.module.css'
import axios from "axios";
import Spinner from '../General/Spinner/Spinner';
function DisplayFormData() {
    const { host } = useContext(AppContext)
    const [listOfRoomTypes, setlistOfRoomTypes] = useState([]);
    const [loading, setLoading] = useState(false); 
    useEffect(() => {
        setLoading(true)
        axios.get(`${host}/roomtypes`).then((response) => {
            setlistOfRoomTypes(response.data);
            console.log(listOfRoomTypes)
            setLoading(false)
        });
    }, []);

    const makeReq = async (formData) => {
        setLoading(true)
        await axios.post(`${host}/roomtypes`, formData).then(() => {
            axios.get(`${host}/roomtypes`).then((response) => {
                setlistOfRoomTypes(response.data);
                setLoading(false)
            });
        })
    }

    return (
        <React.Fragment>
          {loading && <Spinner loading={loading}/>}
            <div className={style.cover}>
                <FormOne makeReq={makeReq} />

                <Table  listOfRoomTypes={listOfRoomTypes} />
            </div>


        </React.Fragment>


    )

}
export default DisplayFormData;
