import {
  UPDATE_ANSWER,
  GET_ANSWER,
  GET_STATUS_ASSIGNMENTS,
  GET_STATUS_QUESTIONS,
  GET_STATUS_BY_STUDENT,
  UPDATE_SCORE,
  STATUS_LOADING,
} from "../actions/type";

const initailState = {
  answer: {},
  edit: [],
  statusAssignments: [],
  statusQuestions: [],
  statusStudent: [],
  loading: false,
};

export default function d(state = initailState, action) {
  switch (action.type) {
    case STATUS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_STATUS_ASSIGNMENTS:
      return {
        ...state,
        statusAssignments: action.payload.detail,
        count: action.payload.count,
        loading: false,
      };
    case GET_STATUS_QUESTIONS:
      return {
        ...state,
        statusQuestions: action.payload,
        loading: false,
      };
    case GET_STATUS_BY_STUDENT:
      return {
        ...state,
        statusStudent: action.payload,
        loading: false,
      };
    case GET_ANSWER:
      return {
        ...state,
        answer: action.payload.detail,
        code: action.payload.detail.answer.code,
        loading: false,
      };
    case UPDATE_ANSWER:
      return {
        ...state,
        edit: [action.payload, ...state.edit],
      };
    case UPDATE_SCORE:
      return {
        ...state,
        answer: action.payload,
      };
    default:
      return state;
  }
}
