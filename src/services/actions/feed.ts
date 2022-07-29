import { TCaseReducerFeed } from "../../utils/types";

export const setSocketLoading: TCaseReducerFeed = (state, action) => {
  state.isLoading = action.payload.loading;
};

export const setOrderFeedData: TCaseReducerFeed = (state, action) => {
  if (action.payload.owner) {
    state.ownerOrderFeedData = action.payload.data;
  } else {
    state.allOrderFeedData = action.payload.data;
  }
  state.isLoading = true;
};
