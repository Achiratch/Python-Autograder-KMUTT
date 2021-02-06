import{ TEST_DISPATCH} from '../actions/type';

const initailState = {
    isAuthenticated: false,
    user:{}
}
export default function(state = initailState, action) {
    switch(action.type) {
        case TEST_DISPATCH:
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}