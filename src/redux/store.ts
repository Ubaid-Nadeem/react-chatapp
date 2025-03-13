import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import userSlice from "./slices/user";
import loaderSlice from "./slices/loader";
import chatSlice from "./slices/chatting";
import socketSlice from "./slices/socket/socket";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    loader: loaderSlice,
    chatting: chatSlice,
    socket: socketSlice,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
