import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ActionInfo } from "src/types/index";

type State = {
  myInfo: any;
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
  positions: any;
};
const initialState: State = {
  myInfo: {},
  positions: {},
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
      state.participants = {};
      state.actionInfo = {};
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

    setOthersPosition: (state, action) => {
      state.actionInfo[action.payload._id].position = action.payload.position;
    },

    setMyPosition: (state, action) => {
      state.myInfo = action.payload;
    },

    deleteInfo: (state, action) => {
      delete state.actionInfo[action.payload._id];
    },
    leave: (state, action) => {},

    positions: (state, action) => {
      state.positions[action.payload._id] = action.payload.position;
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
  setOthersPosition,
  deleteInfo,
  leave,
  setMyPosition,
  positions,
} = socketSlice.actions;
export const socketReducer = socketSlice.reducer;
