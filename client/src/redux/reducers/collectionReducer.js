import {
  GET_QUESTION,
  GET_QUESTIONS,
  ADD_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
  QUESTION_LOADING,
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
        questions: action.payload.detail,
        count: action.payload.count,
        searchCount: action.payload.searchCount,
        loading: false,
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        sct: action.payload.sct.code,
        solution: action.payload.solution.code,
        sample: action.payload.sample.code,
        preExercise: action.payload.preExercise.code,
        loading: false,
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
      };
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question) => {
          console.log(action.payload._id);
          if (question._id === action.payload._id) {
            return {
              ...question,
              name: action.payload.name,
              description: action.payload.description,
              level: action.payload.level,
              sct: action.payload.sct,
              solution: action.payload.solution,
              sample: action.payload.sample,
              preExercise: action.payload.preExercise,
            };
          } else return question;
        }),
      };
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
