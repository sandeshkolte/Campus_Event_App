import { baseUrl } from "@/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch users by branch
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async ({ branch, role }) => {
  const response = await axios.post(`${baseUrl}/api/admin/students`, { branch, role });
  // console.log("Users:", response.data);

  return response.data; // Assuming the backend returns the user list directly
});

// Fetch events by branch
export const fetchEvents = createAsyncThunk("admin/fetchEvents", async (organizingBranch) => {
  const response = await axios.get(`${baseUrl}/api/event/branch`, {
    params: { organizingBranch }, 
  });


  const events = response.data.response; // Extract events list
  // console.log("Events:", events);

  // Calculate the total number of participants and total revenue
  const totalParticipants = events.reduce((acc, event) => acc + event.participants.length, 0);
  const totalRevenue = events.reduce((acc, event) => {
    if (event.isGroupEvent) {
      const numberOfGroups = Math.ceil(event.participants.length / event.participantSize);
      return acc + numberOfGroups * event.price;
    } else {
      return acc + event.participants.length * event.price;
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
      // Handle fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Update users with the fetched data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchEvents
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events; // Update events with the fetched data
        state.totalParticipants = action.payload.totalParticipants; // Update total participants
        state.totalRevenue = action.payload.totalRevenue; // Update total revenue
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;