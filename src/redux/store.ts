import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./slices/friendsSlice";
import postsReducer from "./slices/postSlice";
import usersReducer from "./slices/usersSlice";
export const store = configureStore({
  reducer: {
    friends: friendsReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
