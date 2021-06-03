import {
  GET_ASSIGNMENT,
  GET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  ASSIGNMENT_LOADING,
  GET_QUESTIONS_BY_ASSIGNMENT,
} from "../actions/type";

const initailState = {
  assignments: [],
  assignment: {},
  questionsByAssignment:[],
  loading: false,
};

export default function d(state = initailState, action) {
  switch (action.type) {
    case ASSIGNMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload.detail,
        count: action.payload.count,
        loading: false,
      };
    case GET_ASSIGNMENT:
      return {
        ...state,
        assignment: action.payload,
        loading: false,
      };
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignments: [action.payload, ...state.assignments],
      };
    case GET_QUESTIONS_BY_ASSIGNMENT:
      return {
        ...state,
        questionsByAssignment: action.payload,
        loading: false,
      };
    case UPDATE_ASSIGNMENT:
      return {
        ...state,
        assignments: state.assignments.map((assignment) => {
          console.log(action.payload._id);
          if (assignment._id === action.payload._id) {
            return {
              ...assignment,
              name: action.payload.name,
              description: action.payload.description,
              level: action.payload.level,
              dueDate: action.payload.dueDate,
              type: action.payload.type,
              course: action.payload.course,
              questions: action.payload.questions,
            };
          } else return assignment;
        }),
      };
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        assignments: state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
