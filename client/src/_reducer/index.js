import { combineReducers } from '@reduxjs/toolkit';
import togglesReducer from '_reducer/togglesReducer';
import userReducer from '_reducer/userReducer';
import headerNavReducer from '_reducer/HeaderNavReducer';
import imageReducer from '_reducer/imageReducer';

const rootReducer = combineReducers({
    toggles: togglesReducer, 
    user: userReducer,
    headerNav: headerNavReducer,
    image: imageReducer
});

export default rootReducer;