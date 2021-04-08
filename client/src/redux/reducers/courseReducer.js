import {
  ADD_COURSE,
  GET_COURSES,
  GET_COURSE,
  COURSE_LOADING,
  DELETE_COURSE,
  UPDATE_COURSE,
  GET_COURSES_BY_FILTER,
} from "../actions/type";

const initailState = {
  courses: [],
  course: {},
  loading: false,
};

export default function c(state = initailState, action) {
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
      case GET_COURSES_BY_FILTER:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case GET_COURSE:
      return {
        ...state,
        course: action.payload,
        loading: false,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map(
          (course) => {
          if(course._id === action.payload.message._id) {
            return {
               ...course,
               courseID: action.payload.message.courseID,
               courseName: action.payload.message.courseName,
               courseDescription: action.payload.message.courseDescription,
               semester: action.payload.message.semester,
               academicYear: action.payload.message.academicYear,
            }
          } else return course;
          }),
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
