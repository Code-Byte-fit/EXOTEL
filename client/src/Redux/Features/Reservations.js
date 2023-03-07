import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const reservationsURL="http://localhost:3001/reservations"


const initialState={
    reservations:[],
    status:'idle',
    error:null,
}

export const fetchReservations=createAsyncThunk('Reservations/fetchReservations',async ()=>{
        const response=await axios.get(reservationsURL)
        return response.data
})

const reservationsSlice=createSlice({
    name:'reservations',
    initialState,
    reducers:{
        fetch:(state)=>{
            state.reservations= fetchReservations();
            
        }
        
    },
    // extraReducers(builder){
    //     builder.addCase(fetchReservations.pending,(state,action)=>{
    //         state.status='loading'
    //     })
    //     .addCase(fetchReservations.fulfilled,(state,action)=>{
    //         state.status='success'
    //         state.reservations = action.payload
    //         console.log('Reservations:', state.reservations); 
    //     })
    //     .addCase(fetchReservations.rejected,(state,action)=>{
    //         state.status='failed'
    //         state.error=action.error.message
    //     })    
    // }
})

export default reservationsSlice.reducer;