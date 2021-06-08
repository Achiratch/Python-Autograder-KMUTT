import {
  UPDATE_ANSWER,
  GET_ANSWER,
  GET_STATUS_ASSIGNMENTS,
  GET_STATUS_QUESTIONS,
  STATUS_LOADING,
} from "../actions/type";

const initailState = {
  answer: {},
  statusAssignments: [],
  statusQuestions: [],
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
        statusQuestions: action.payload.detail,
        loading: false,
      };
    case GET_ANSWER:
      return {
        ...state,
        answer: action.payload.detail,
        code: action.payload.detail.answer.code,
        loading: false,
      };
    default:
      return state;
  }
}
