import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentType } from "react";

type BaseModalType = {
  onCloseModal: () => void;
  props?: {
    message: string;
  };
};

type ModalComponentType = ComponentType<BaseModalType>;

type ModalItem = {
  Component: ComponentType<BaseModalType>;
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
    closeModal: (state, action: PayloadAction<ModalComponentType>) => {
      state.openedModals = state.openedModals.filter(
        (modal) => modal.Component !== action.payload,
      );
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
