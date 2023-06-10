import { createSlice } from '@reduxjs/toolkit';

export const userRoleSlice = createSlice({
  name: 'userRole',
  initialState: {
    value: localStorage.getItem('userRole') || '',
  },
  reducers: {
    setUserRole: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('userRole', action.payload);
    },
  },
});

export const { setUserRole } = userRoleSlice.actions;

export const selectUserRole = state => state.userRole.value;

export default userRoleSlice.reducer;
