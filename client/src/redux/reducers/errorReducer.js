import {GET_ERRORS} from '../actions/type'
const initailState = {};
  export default function b(state = initailState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload;
      default:
        return state;
    }
  }
  