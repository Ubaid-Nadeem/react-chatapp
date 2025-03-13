import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

type SocketState = {
  socket: any;
  isConnected: boolean;
};

const initialState: SocketState = {
  socket: null,
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      console.log(action.payload);
      //   state.socket = action.payload;
      //   state.isConnected = true;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
