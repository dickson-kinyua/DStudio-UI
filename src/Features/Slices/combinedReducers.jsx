import { combineReducers } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import userSlice from "./UserSlice";

const rootReducer = combineReducers({
  task: taskSlice,
  user: userSlice,
});

export default rootReducer;
