import { CREATE_COURSE } from "../actions/type";

const initailState = {
  courses: [],
  course: {},
  
};

export default function createCourseReducer(state = initailState, action) {
  switch (action.type) {
    case CREATE_COURSE:
      return {
        ...state,
        courses: action.payload,
        ...state.courses,
      };

    default:
      return state;
  }
}
