import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { IStateFeed } from "../../utils/types";
import { setAllOrderFeedData, setOwnerOrderFeedData } from "../actions/feed";

const initialState = {
  allOrderFeedData: { orders: [], success: false, total: 0, totalToday: 0 },
  ownerOrderFeedData: { orders: [], success: false, total: 0, totalToday: 0 },
};

export const feedsSlice = createSlice<IStateFeed, SliceCaseReducers<IStateFeed>>({
  name: "feed",
  initialState,
  reducers: {
    setAllOrderFeedData,
    setOwnerOrderFeedData,
  },
});

export default feedsSlice;
