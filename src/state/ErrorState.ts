import { createSlice } from "@reduxjs/toolkit";

type Error = string[];

const initialState: Error = []; 

export const errorState = createSlice({
    name: 'error',
    initialState,
    reducers: {
        add: (state, action) => [...state, action.payload],
        clear: (state, action) => []
    }
});