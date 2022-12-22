import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./slices/friendsSlice";
import postsReducer from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    friends: friendsReducer,
    posts: postsReducer,
  },
});
