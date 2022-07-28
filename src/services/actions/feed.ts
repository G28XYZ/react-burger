import { TCaseReducerFeed } from "../../utils/types";

export const setAllOrderFeedData: TCaseReducerFeed = (state, action) => {
  state.allOrderFeedData = action.payload.data;
};

export const setOwnerOrderFeedData: TCaseReducerFeed = (state, action) => {
  state.ownerOrderFeedData = action.payload.data;
};
