
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "./Store";

export const logginMiddleware: Middleware<
    {}, 
    RootState
> = store => next => action => {
    console.log('Received action', action);

    // const state = store.getState();
    // console.log('Current state', state);
    
    next(action);
}