import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const usersSlice = createSlice({
  name: "users",
  initialState: { value: [],isUserNameValid: true},
  reducers: {
    addUser: (state, action) => {
      axios.post("http://localhost:3001/register", action.payload)
        .then(response => {
          console.log(response.data);
          state.isUserNameValid = true;
        })
        .catch(error => {
          state.isUserNameValid = false;
          console.log(state.isUserNameValid);
          
        });
    },
    setIsUserNameValid: (state) => {
        state.isUserNameValid = true;
      },

  }
});

export default usersSlice.reducer;
