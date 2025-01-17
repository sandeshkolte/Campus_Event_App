import { baseUrl } from "@/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(`${baseUrl}/api/user/getuserbybranch`);
  return response.data.response;
});

export const fetchEvents = createAsyncThunk("admin/fetchEvents", async () => {
  const response = await axios.get(`${baseUrl}/api/event/branch`);
  const events = response.data.response;

  // Calculate the total number of participants and total revenue
  const totalParticipants = events.reduce((acc, event) => acc + event.participants.length, 0);
  const totalRevenue = events.reduce((acc, event) => {
    if (event.isGroupEvent) {
      const numberOfGroups = Math.ceil(event.participants.length / event.participantSize);
      return acc + (numberOfGroups * event.price);
    } else {
      return acc + (event.participants.length * event.price);
    }
  }, 0);

  return { events, totalParticipants, totalRevenue };
});

const initialState = {
  users: [],
  events: [],
  totalParticipants: 0,
  totalRevenue: 0,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.totalParticipants = action.payload.totalParticipants;
        state.totalRevenue = action.payload.totalRevenue;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;