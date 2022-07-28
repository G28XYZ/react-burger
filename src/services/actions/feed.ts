import { PayloadAction } from "@reduxjs/toolkit";
import { IFetchOrdersData } from "../../utils/types";

export const setOrderFeedData = (
  state: { allOrderFeedData: IFetchOrdersData },
  action: PayloadAction<{ data: IFetchOrdersData }>
) => {
  state.allOrderFeedData = action.payload.data;
};
