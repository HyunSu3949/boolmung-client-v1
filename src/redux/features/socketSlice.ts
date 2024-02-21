import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  messageList: [],
  position: {},
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
      }>,
    ) => {},
    leave: (state) => {
      state.messageList = [];
    },
    disconnect: (state) => {
      state.messageList = [];
    },
    reload: () => {},
    setMessageList: (
      state,
      action: PayloadAction<{ message: string; type: string }>,
    ) => {
      state.messageList.push(action.payload);
    },
    setPositionList: (state, action: PayloadAction<any>) => {
      state.position = {
        ...state.position,
        [action.payload.user]: action.payload.position,
      };
    },
  },
});

export const { setMessageList, setPositionList, connect, disconnect, leave } =
  socketSlice.actions;
export const socketReducer = socketSlice.reducer;
