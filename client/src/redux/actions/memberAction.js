import axios from "axios";
import {
  MEMBER_LOADING,
  GET_STUDENTS,
  GET_ALLSTUDENTS,
  GET_ERRORS,
} from "./type";

//Get Students
export const getStudents = (id) => (dispatch) => {
  dispatch(setStudentLoading());
  axios
    .get(`/api/course/${id}/students`)
    .then((res) =>
      dispatch({
        type: GET_STUDENTS,
        payload: res.data.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Get All Students
export const getAllStudents = (id) => (dispatch) => {
  dispatch(setStudentLoading());
  axios
    .get(`/api/course/student`)
    .then((res) =>
      dispatch({
        type: GET_ALLSTUDENTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//Set loading state
export const setStudentLoading = () => {
  return {
    type: MEMBER_LOADING,
  };
};
