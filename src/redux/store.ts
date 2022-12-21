import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "./slices/friendsSlice";

export const store = configureStore({
  reducer: {
    friends: friendsReducer,
  },
});
