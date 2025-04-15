import { createSlice } from "@reduxjs/toolkit";

type messageType = {
  message: string;
  sender: any;
  reciver: any;
  timestamp: Date;
  unique: String;
  seen?: boolean;
};

export type friendType = {
  uid: string;
  name: string;
  email: string;
  messages: messageType[] | [];
  lastMessage: messageType | undefined;
  fetchchat: boolean;
};

type userType = {
  name: string;
  email: string;
};

type initialStateType = {
  user: null | userType;
  isLogin: boolean;
  uid: string;
  friends: friendType[];
  fetchUser: boolean;
  socketConnected: boolean;
};

const initialState: initialStateType = {
  user: null,
  isLogin: false,
  uid: "",
  friends: [],
  fetchUser: false,
  socketConnected: false, //add socket connection status
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => (state = action.payload),
    logout: (state) => (state = initialState),
    updateMessages: (state: initialStateType, action) => {
      let lastMessageIndex = action.payload.messages.length - 1;
      return (state = {
        ...state,
        friends: state.friends.map((friend: friendType) =>
          friend.uid === action.payload.uid
            ? {
                ...friend,
                messages: action.payload.messages,
                lastMessage: action.payload.messages[lastMessageIndex],
              }
            : friend
        ),
      });
    },
    chatStatus: (state: initialStateType, action) => {
      return (state = {
        ...state,
        friends: state.friends.map((friend: friendType) =>
          friend.uid === action.payload.uid
            ? {
                ...friend,
                fetchchat: true,
              }
            : friend
        ),
      });
    },
    setSocketConnected: (state, action) => {
      return (state = { ...state, socketConnected: action.payload });
    },
    setNewMessage: (state, action) => {
      function filterMessage() {
        let frinedClone = [...state.friends];
        let matched = false;
        let filter = frinedClone.map((friend) => {
          if (friend.uid === action.payload.uid) {
            matched = true;
            return {
              ...friend,
              messages: [...friend.messages, action.payload.message],
              lastMessage: action.payload.message,
            };
          } else {
            return friend;
          }
        });

        if (!matched) {
          filter = [
            ...filter,
            {
              uid: action.payload.uid,
              name: action.payload.name,
              email: action.payload.email,
              messages: [action.payload.message],
              lastMessage: action.payload.message,
              fetchchat: false,
            },
          ];
        }
        return filter;
      }

      return (state = {
        ...state,
        friends: filterMessage(),
      });
    },
    setFriendIndex: (state, action) => {
      const { sender, reciver } = action.payload;
      let friendClone = [...state.friends];
      friendClone.find((value, index) => {
        if (value.uid == sender || value.uid == reciver) {
          friendClone.splice(index, 1);
          friendClone.unshift(value);
        }
      });

      return (state = {
        ...state,
        friends: friendClone,
      });
    },
    setNewFriend: (state, action) => {
      let { email, name, uid } = action.payload;

      let friendClone = [...state.friends];
      friendClone.unshift({
        messages: [],
        uid: uid,
        name: name,
        email: email,
        lastMessage: undefined,
        fetchchat: false,
      });
      return (state = {
        ...state,
        friends: friendClone,
      });
    },
    DeleteMessage: (state, action) => {
      let { MsgClone, friendID, unique } = action.payload;
      let friends = state.friends.map((friend) => {
        if (friend.uid == friendID) {
          if (friend.lastMessage?.unique === unique) {
            return {
              ...friend,
              messages: MsgClone,
              lastMessage: MsgClone[MsgClone.length - 1],
            };
          } else {
            return {
              ...friend,
              messages: MsgClone,
            };
          }
        } else {
          return friend;
        }
      });

      return (state = {
        ...state,
        friends: friends,
      });
    },
  },
});

export const {
  setUser,
  logout,
  updateMessages,
  chatStatus,
  setSocketConnected,
  setNewMessage,
  setFriendIndex,
  setNewFriend,
  DeleteMessage,
} = userSlice.actions;

export default userSlice.reducer;
