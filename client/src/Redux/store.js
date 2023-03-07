import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import usersReducer from "./Features/Users"

export const store=configureStore({
    reducer:{
        users:usersReducer,
    },
    middleware: [thunk],
});

