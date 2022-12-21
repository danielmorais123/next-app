import { createSlice } from "@reduxjs/toolkit";
import { FriendsList } from "../../types/typing";

const initialState = {
  friends: [],
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    addFriend: (state, action) => {
      state.friends = [...action.payload];
    },
    removeFriend: (state, action) => {
      let newArray = [...action.payload];
      let index = state.friends.findIndex(
        (friend) => friend?.friendId === action.payload
      );
      newArray.splice(index, 1);
      state.friends = [...newArray];
    },
  },
});

export const { addFriend, removeFriend } = friendsSlice.actions;

/* @ts-ignore */
export const selectFriends = (state) => state.friends.friends;

export default friendsSlice.reducer;
