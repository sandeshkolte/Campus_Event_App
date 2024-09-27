import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../store/authSlice"
import eventReducer from "../store/eventSlice"
import navSlice from "./navSlice"

const store = configureStore({
reducer:{
    auth : authReducer,
    event: eventReducer,
    nav:navSlice,
}
})

export default store