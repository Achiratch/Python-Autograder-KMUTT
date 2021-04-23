import {
  GET_QUESTION,
  GET_QUESTIONS,
  ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  QUESTION_LOADING
} from "../actions/type";

const initailState = {
  questions: [],
  question: {},
  loading: false,
};

export default function d(state = initailState, action) {
  switch (action.type) {
    case QUESTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        loading: false,
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };
    // case UPDATE_QUESTION:
    //   return {
    //     ...state,
    //     courses: state.courses.map((course) => {
    //       if (course._id === action.payload.message._id) {
    //         return {
    //           ...course,
    //           courseID: action.payload.message.courseID,
    //           courseName: action.payload.message.courseName,
    //           courseDescription: action.payload.message.courseDescription,
    //           semester: action.payload.message.semester,
    //           academicYear: action.payload.message.academicYear,
    //         };
    //       } else return course;
    //     }),
    //   };
     case DELETE_QUESTION:
       return {
         ...state,
         questions: state.questions.filter(
           (question) => question._id !== action.payload
         ),
       };
    default:
      return state;
  }
}
