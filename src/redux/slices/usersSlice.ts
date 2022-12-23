import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserToAdd } from "../../types/typing";

interface InitialState {
  users: UserToAdd[];
}

const initialState: InitialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserToAdd[]>) => {
      state.users = [...action.payload];
    },
  },
});

export const { setUsers } = usersSlice.actions;

/* @ts-ignore */
export const selectUsers = (state) => state.users.users;

export default usersSlice.reducer;
