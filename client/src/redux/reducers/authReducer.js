import isEmpty from "../../validation/is-empty";
import {
  SET_CURRENT_USER,
  GET_ALL_USERS,
  UPDATE_ROLE,
  USERS_LOADING,
} from "../actions/type";

const initailState = {
  isAuthenticated: false,
  user: {},
  users: [],
  loading: false,
};
export default function a(state = initailState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.detail,
        loading: false,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        users: state.users.map(
          (user) => {
          if(user._id === action.payload.detail._id) {
            return {
               ...user,
               role: action.payload.detail.role,
            }
          } else return user;
          }),
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
