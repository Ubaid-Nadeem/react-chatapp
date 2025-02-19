import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { friendType } from "../user";

type userType = {
  uid: string;
  name: string;
  message: string;
  time: string;
};

type initialStateType = {
  ischatting: boolean;
  user: friendType | null;
  isLoaded: boolean;
};

const initialState: initialStateType = {
  ischatting: false,
  user: null,
  isLoaded: false,
};

export const chatSlice = createSlice({
  initialState,
  name: "chatting",
  reducers: {
    startChat: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setLoadedChat: (state, action) => {
      return {
        ...state,
        isLoaded: action.payload,
      };
    },
    setChatting: (state, action) => {
      return {
        ...state,
        ischatting: action.payload,
      };
    },
  },
});

export const { startChat, setLoadedChat, setChatting } = chatSlice.actions;
export default chatSlice.reducer;
