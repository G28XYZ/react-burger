import { createSlice } from "@reduxjs/toolkit";
import { setOrderFeedData } from "../actions/feed";

const initialState = {
  allOrderFeedData: { orders: [], success: false, total: 0, totalToday: 0 },
};

export const feedsSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setOrderFeedData,
  },
});

export default feedsSlice;
