import {TEST_DISPATCH} from './type';

//Register User
export const registerUser=userData =>{
    return{
        type: TEST_DISPATCH,
        payload: userData
    };
};