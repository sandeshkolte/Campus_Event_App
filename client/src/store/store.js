import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../store/authSlice"
import eventReducer from "../store/eventSlice"
import adminReducer from "../store/adminSlice"
import navSlice from "./navSlice"

const store = configureStore({
reducer:{
    auth : authReducer,
    event: eventReducer,
    nav:navSlice,
    admin: adminReducer,
}
})

export default store