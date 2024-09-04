import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../store/authSlice"
import eventReducer from "../store/eventSlice"

const store = configureStore({
reducer:{
    auth : authReducer,
    event: eventReducer
}
})

export default store