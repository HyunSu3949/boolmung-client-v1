import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ActionInfo } from "src/types/index";

type State = {
  participants: {
    [key in string]: any;
  };
  messageList: any[];
  actionInfo: {
    [key: string]: ActionInfo;
  };
  roomInfo: any;
  isError: boolean;
  errorMassage: string;
};
const initialState: State = {
  participants: {},
  messageList: [],
  actionInfo: {},
  roomInfo: {},
  isError: false,
  errorMassage: "",
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connect: (
      state,
      action: PayloadAction<{
        _id: string;
        roomId: string;
        name: string;
        image: string;
      }>,
    ) => {},

    disconnect: (state) => {
      state.messageList = [];
    },

    join: (state, action) => {
      state.participants = {
        ...state.participants,
        [action.payload._id]: action.payload,
      };
    },

    setMessageList: (
      state,
      action: PayloadAction<{ message: string; type: string }>,
    ) => {
      state.messageList.push(action.payload);
    },

    move: (state, action: PayloadAction<ActionInfo>) => {
      state.actionInfo = {
        ...state.actionInfo,
        [action.payload._id]: action.payload,
      };
    },

    getRoomInfo: (state, action) => {
      state.roomInfo = action.payload;
    },

    setError: (state, action) => {
      state.isError = action.payload.errorState;
      state.errorMassage = action.payload.message;
    },
  },
});

export const {
  setMessageList,
  connect,
  disconnect,
  move,
  join,
  getRoomInfo,
  setError,
} = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
