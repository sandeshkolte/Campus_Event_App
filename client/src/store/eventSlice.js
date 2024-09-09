import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events:[]
}

const eventSlice = createSlice({
    name:"event",
    initialState,
    reducers:{
      allEvents: (state, action) => {
          state.events = action.payload
        },
        addEvent: (state, action) => {
            state.events.push(action.payload);
          },
          deleteEvent: (state, action) => {
            state.events = state.events.filter((event) => event._id !== action.payload._id);
          },
    }
})

export const {allEvents,addEvent,deleteEvent} = eventSlice.actions

export default eventSlice.reducer