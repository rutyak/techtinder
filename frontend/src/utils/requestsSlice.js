import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (_, action) => action.payload,
    removeRequest: (state, action) => {
      return state.filter((req) => req._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
