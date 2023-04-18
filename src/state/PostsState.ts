import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../entities/Post";
import { AppDispatch, RootState } from "./Store";
import axios from "axios";
import { loadingState } from "./LoadingState";
import { errorState } from "./ErrorState";
import { Draft } from "immer";
import { ThunkAction } from "@reduxjs/toolkit";

type PostsState = {
  posts: Post[];
  showPinnedOnly: boolean;
}

const initialState: PostsState = {
  posts: [],
  showPinnedOnly: false,
};

export const postsState = createSlice({
  name: "posts",
  initialState,
  reducers: {
    populate: (state, action) => {
      state.posts = action.payload;
    },
    remove: (state, action) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
    },

    editPost: (state, action) => {
      const { id, data }: { id: number; data: string } = action.payload;
      const post = state.posts.find((p) => p.id === id) as Post;
      post.body = data;
    },

    pin: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload.id) as Draft<Post>;
      if (post) post.isPinned = true;
    },

    unpin: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload.id) as Draft<Post>;
      if (post) post.isPinned = false;
    },
  },
});


// Only any type I haven't been able to remove for the moment.
export const fetchPosts = (url: string): any => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(loadingState.actions.start(1));

            const aborController = new AbortController();
            const response = await axios.get<Post[]>(url, { 
              signal: aborController.signal 
            });

            dispatch(postsState.actions.populate(response.data));
        } catch (err) {
            dispatch(errorState.actions.add(err));
        } finally {
            dispatch(loadingState.actions.end(0));
        }
    };
};
