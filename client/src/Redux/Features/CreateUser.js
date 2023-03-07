import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserNameValid: true,
  isConfirmed: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setIsUserNameValid: (state, action) => {
      state.isUserNameValid = action.payload;
    },
    setIsConfirmed: (state, action) => {
      state.isConfirmed = action.payload;
    },
  },
});

export const { setIsUserNameValid, setIsConfirmed } = registrationSlice.actions;
