import { createSlice } from "@reduxjs/toolkit";
import { FriendsList } from "../../types/typing";

interface InitialState {
  friends: FriendsList[];
}

const initialState: InitialState = {
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
      let newArray = [...state.friends];
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
