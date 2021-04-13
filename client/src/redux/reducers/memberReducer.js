import {
  MEMBER_LOADING,
  GET_STUDENTS,
} from "../actions/type";

const initailState = {
  students: [],
  student: {},
  loading: false,
};

export default function d(state = initailState, action) {
  switch (action.type) {
    case MEMBER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
