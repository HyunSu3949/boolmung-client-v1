import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ActionName, Input, User } from "src/types/index";

type ActionState = {
  input: Input;
  action: ActionName;
};
const initialState: ActionState = {
  input: { forward: false, backward: false, left: false, right: false },
  action: "",
};
const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    setDirectionInput: (
      state,
      action: PayloadAction<{ [key in string]: boolean }>,
    ) => {
      state.input = { ...state.input, ...action.payload };
    },
    setActionState: (state, action: PayloadAction<ActionName>) => {
      state.action = action.payload;
    },
  },
});

export const { setDirectionInput, setActionState } = actionSlice.actions;
export const actionReducer = actionSlice.reducer;
