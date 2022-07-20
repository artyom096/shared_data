import { combineReducers } from "redux";

import fileReducer from "./fileReducer";
import userReducer from "./userReducer";

const rootReducers = combineReducers({
  file: fileReducer,
  user: userReducer,
});

export default rootReducers;
