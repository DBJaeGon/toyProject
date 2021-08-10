import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nav: false
};

const togglesSlice = createSlice({
    name: 'toggles',
    initialState,
    reducers: {
        navToggle (state, action) {
            state.nav = action.payload;
        },
    }
});

export const { navToggle } = togglesSlice.actions;

export default togglesSlice.reducer;