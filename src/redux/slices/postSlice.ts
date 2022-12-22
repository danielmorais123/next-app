import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostType } from "../../types/typing";

interface InitialState {
  posts: PostType[];
}

const initialState: InitialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostType[]>) => {
      state.posts = [...action.payload];
    },
  },
});

export const { setPosts } = postsSlice.actions;

/* @ts-ignore */
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
