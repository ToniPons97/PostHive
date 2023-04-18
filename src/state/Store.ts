import { combineReducers } from "redux";
import { postsState } from "./PostsState";
import { configureStore } from "@reduxjs/toolkit";
import { logginMiddleware } from "./LoggingMiddleware";
import thunkMiddleware from 'redux-thunk';
import { loadingState } from "./LoadingState";
import { errorState } from "./ErrorState";

const rootReducer = combineReducers({
    posts: postsState.reducer,
    ui: combineReducers({
        loading: loadingState.reducer,
        error: errorState.reducer
    })
});

export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: [logginMiddleware, thunkMiddleware]
    }
);

export type RootState = ReturnType<typeof rootReducer >;
export type AppDispatch = typeof store.dispatch;