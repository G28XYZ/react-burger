import { createSlice } from "@reduxjs/toolkit";
import { setOrderFeedData } from "../actions/feed";

const initialState = {
  orderData: [],
};

export const feedsSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setOrderFeedData,
  },
});

export default feedsSlice;
