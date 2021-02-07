import { GET_ERRORS, SET_CURRENT_USER } from "./type";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utills/setAuthToken';
import axios from "axios";
//Register User
export const registerUser = (userData) => (dispath) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => console.log("/login"))
    .catch((err) =>
      dispath({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - Get User Token
export const loginUser = (userData) => (dispath) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
        //Save to localStorage
        const {token} = res.data;
        //Set token to ls
        localStorage.setItem('jwtToken',token);
        //Set token to Auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set current user
        dispath(setCurrentUser(decoded));
    })
    .catch((err) => dispath({}));
};

//Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
