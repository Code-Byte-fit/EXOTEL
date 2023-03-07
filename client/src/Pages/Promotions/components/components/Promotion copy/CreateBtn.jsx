import React from "react";
import Button from "../Common/Button/Button"
import style from "./Rooms.module.css";

function CreateBtn({handleAddFormSubmit}){

    return(

        <React.Fragment>
        <span className={style.createBtn}> 
        <button  className={style.buttonOne}  type="submit" onClick={handleAddFormSubmit}>Create Room</button>
         {/* <Button type="submit" text="Create Room" onSubmit={handleAddFormSubmit}/> */}
         </span> 
        
</React.Fragment>
    )
}

export default CreateBtn;