import axios from "axios";
import {
  MEMBER_LOADING,
  GET_STUDENTS,
  GET_ALLSTUDENTS,
  GET_ERRORS,
  ADD_STUDENT,
  DELETE_STUDENT
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
    .get(`/api/course/${id}/invite`)
    .then((res) =>
      dispatch({
        type: GET_ALLSTUDENTS,
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

//Add Students to course
export const addStudent = (studentData) => (dispatch) => {
  axios
    .post("/api/course/invite", studentData)
    .then((res) =>
      dispatch({
        type: ADD_STUDENT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_STUDENT,
        payload: err.response.data,
      })
    );
};

//Delete student
export const deleteStudent = (id) => (dispatch) => {
  axios
    .delete(`/api/course/kick/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_STUDENT,
        payload: id,
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
