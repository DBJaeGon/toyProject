import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    headerNav: "Home",
    menuList: {
        "/": "Home",
        "/boards": "Board",
        "/image": "Image",
        "/chat": "Chat",
        "/signIn": "Sign In",
        "/signUp": "Sign Up",
        "/myInfo": "My Info",
        "/setting": "Setting",
        "/findPw": "Find Password"
    }
};

const headerLocSlice = createSlice({
    name: "headerNav",
    initialState,
    reducers: {
        currentLoc(state, action) {
            if(state.menuList[action.payload]){
                state.headerNav = state.menuList[action.payload];
            } else {
                state.headerNav = "404";
            }
            // state.headerNav = action.payload;
        }
    }
});

export const { currentLoc } = headerLocSlice.actions;
export default headerLocSlice.reducer;