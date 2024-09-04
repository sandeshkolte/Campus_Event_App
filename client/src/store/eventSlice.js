import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events:[]
}

const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers:{
        addEvent: (state, action) => {
            state.events.push({eventid:action.payload,details: action.payload});
          },
          deleteEvent: (state, action) => {
            state.events = state.events.filter((event) => event.id !== action.payload.id);
          },
    }
})

export const {addEvent,deleteEvent} = eventSlice.actions

export default eventSlice.reducer