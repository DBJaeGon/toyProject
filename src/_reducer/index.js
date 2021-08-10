import { combineReducers } from '@reduxjs/toolkit';
import togglesReducer from '_reducer/togglesReducer';
import userReducer from '_reducer/userReducer';
import headerNavReducer from '_reducer/HeaderNavReducer';

const rootReducer = combineReducers({
    toggles: togglesReducer, 
    user: userReducer,
    headerNav: headerNavReducer
});

export default rootReducer;