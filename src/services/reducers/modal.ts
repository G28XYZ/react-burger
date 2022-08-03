import { createSlice } from '@reduxjs/toolkit';
import { openModalWithOrder, closeModal } from './../actions/modal';

const initialState = {
  title: '',
  orderInModal: false,
  ingredientInModal: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalWithOrder,
    closeModal,
  },
});

export default modalSlice;
