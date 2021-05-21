import {
  GET_ASSIGNMENT,
  GET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  ASSIGNMENT_LOADING,
} from "../actions/type";

const initailState = {
  assignments: [],
  assignment: {},
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
        sct: action.payload.sct.code,
        solution: action.payload.sct.code,
        sample: action.payload.sample.code,
        preExercise: action.payload.preExercise.code,
        loading: false,
      };
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignments: [action.payload, ...state.assignments],
      };
    // case UPDATE_ASSIGNMENT:
    //   return {
    //     ...state,
    //     assignments: state.assignments.map((assignment) => {
    //       console.log(action.payload._id);
    //       if (assignment._id === action.payload._id) {
    //         return {
    //           ...assignment,
    //           name: action.payload.name,
    //           description: action.payload.description,
    //           level: action.payload.level,
    //           sct: action.payload.sct,
    //           solution: action.payload.solution,
    //           sample: action.payload.sample,
    //           preExercise: action.payload.preExercise,
    //         };
    //       } else return assignment;
    //     }),
    //   };
    // case DELETE_ASSIGNMENT:
    //   return {
    //     ...state,
    //     assignments: state.assignments.filter(
    //       (assignment) => assignment._id !== action.payload
    //     ),
    //   };
    default:
      return state;
  }
}
