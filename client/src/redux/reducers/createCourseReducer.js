import { CREATE_COURSE, GET_COURSES, COURSE_LOADING } from "../actions/type";

const initailState = {
  courses: [],
  course: {},
  loading: false,
};

export default function createCourseReducer(state = initailState, action) {
  switch (action.type) {
    case COURSE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case CREATE_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };

    default:
      return state;
  }
}
