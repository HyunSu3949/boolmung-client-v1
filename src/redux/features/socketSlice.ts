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
};
const initialState: State = {
  participants: {},
  messageList: [],
  actionInfo: {},
  roomInfo: {},
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
  },
});

export const { setMessageList, connect, disconnect, move, join, getRoomInfo } =
  socketSlice.actions;
export const socketReducer = socketSlice.reducer;
