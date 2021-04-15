import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import courseReducer from "./courseReducer";
import memberReducer from "./memberReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  course: courseReducer,
  member: memberReducer,
});
