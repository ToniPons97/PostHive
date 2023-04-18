import { createSlice } from "@reduxjs/toolkit";

export const loadingState = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        start: (state, action) => true,
        end: (state, action) => false
    }
});