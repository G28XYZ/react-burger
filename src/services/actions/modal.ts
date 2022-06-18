import { IModal } from "../../utils/types";

export const openModalWithOrder = (state: IModal) => {
  state.orderInModal = true;
};

export const closeModal = (state: IModal) => {
  state.orderInModal = false;
  state.ingredientInModal = null;
};
