import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import createCourseReducer from "./createCourseReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  createCourse: createCourseReducer
});
