import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

type messageType = {
  message: string;
  senderID: any;
  reciverId: any;
  time: Date;
  seen? : boolean
};

export type friendType = {
  uid: string;
  name: string;
  email: string;
  messages: messageType[] | [];
  lastMessage: messageType | undefined;
};

type userType = {
  name: string;
  email: string;
  uid: string;
};

type initialStateType = {
  user: null | userType;
  isLogin: boolean;
  uid: string;
  friends: friendType[];
  fetchUser: boolean;
};

const initialState: initialStateType = {
  user: null,
  isLogin: false,
  uid: "",
  friends: [],
  fetchUser: false,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => (state = action.payload),
    logout: (state) => (state = initialState),
    updateMessages: (state: initialStateType, action) => {
      let lastmsgIndex = action.payload.messages.length - 1;
      return (state = {
        ...state,
        friends: state.friends.map((friend: friendType) =>
          friend.uid === action.payload.uid
            ? {
                ...friend,
                messages: action.payload.messages,
                lastMessage: action.payload.messages[lastmsgIndex],
              }
            : friend
        ),
      });
    },
    sortList: (state, action) => {},
  },
});

export const { setUser, logout, updateMessages } = userSlice.actions;
export default userSlice.reducer;
