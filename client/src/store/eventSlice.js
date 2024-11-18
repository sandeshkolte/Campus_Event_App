import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events:[],
    activeEvents:[]
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
          activeEvents:(state,action)=>{
            state.activeEvents=action.payload
          },
          myOrganizedEvents:(state,action)=>{
            state.myOrganizedEvents=action.payload
          }
    }
})

export const {allEvents,addEvent,deleteEvent,activeEvents,myOrganizedEvents} = eventSlice.actions

export default eventSlice.reducer