import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feeds",
  initialState: null,
  reducers: {
    addFeeds: (state, action) => action.payload,
    removeFeeds: (state, action) => {
      return state.filter((p) => p._id !== action.payload);
    },
  },
});

export const { addFeeds, removeFeeds } = feedSlice.actions;

export default feedSlice.reducer;
