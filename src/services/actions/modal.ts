import { IStateModal } from './../../utils/types';

export const openModalWithOrder = (state: IStateModal) => {
  state.orderInModal = true;
};

export const closeModal = (state: IStateModal) => {
  state.orderInModal = false;
  state.ingredientInModal = null;
};
