import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import courseReducer from "./courseReducer";
import memberReducer from "./memberReducer";
import collectionReducer from "./collectionReducer";
import assignmentReducer from "./assignmentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  course: courseReducer,
  member: memberReducer,
  collection: collectionReducer,
  assignment: assignmentReducer,
});
