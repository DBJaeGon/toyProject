import { combineReducers } from "@reduxjs/toolkit";
import togglesReducer from "_reducer/togglesReducer";
import userReducer from "_reducer/userReducer";
import headerNavReducer from "_reducer/headerNavReducer";
import imageReducer from "_reducer/imageReducer";
import chatReducer from "_reducer/chatReducer";

const rootReducer = combineReducers({
  toggles: togglesReducer,
  user: userReducer,
  headerNav: headerNavReducer,
  image: imageReducer,
  chat: chatReducer,
});

export default rootReducer;
