import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ModalId } from "src/types/index";

type ModalItem = {
  componentId: ModalId;
  props?: {
    message: string;
  };
};

type State = {
  openedModals: ModalItem[];
};

const initialState: State = {
  openedModals: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalItem>) => {
      state.openedModals = [...state.openedModals, action.payload];
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.openedModals = state.openedModals.filter(
        (modal) => modal.componentId !== action.payload,
      );
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
