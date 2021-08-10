import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    headerNav: "Home"
};

const headerLocSlice = createSlice({
    name: "headerNav",
    initialState,
    reducers: {
        currentLoc(state, action) {
            state.headerNav = action.payload;
        }
    }
});

export const { currentLoc } = headerLocSlice.actions;
export default headerLocSlice.reducer;