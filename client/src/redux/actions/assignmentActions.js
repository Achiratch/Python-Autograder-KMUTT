import axios from "axios";
import {
  GET_ASSIGNMENT,
  GET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  ASSIGNMENT_LOADING,
  GET_ERRORS
} from "./type";

//Create Assignment
export const addAssignment = (assignmentData) => (dispatch) => {
  axios
    .post("/api/assignment/create", assignmentData)
    .then((res) =>
      dispatch({
        type: ADD_ASSIGNMENT,
        payload: res.data.detail,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_ASSIGNMENT,
        payload: err.response.data,
      })
    );
};

//Get Assignment by id
export const getAssignment = (id) => (dispatch) => {
    dispatch(setAssignmentLoading());
    axios
      .get(`/api/assignment/${id}`)
      .then((res) =>
        dispatch({
          type: GET_ASSIGNMENT,
          payload: res.data.detail,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ASSIGNMENT,
          payload: null,
        })
      );
  };

//Get all Assignments
export const getAssignments = (search, level, page) => (dispatch) => {
  dispatch(setAssignmentLoading());
  axios
    .get(
      `/api/assignment`
    )
    .then((res) =>
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: null,
      })
    );
};

//Update Assignment by id
export const editAssignment = (id, assignmentData) => (dispatch) => {
    axios
      .put(`/api/assignment/${id}/update`, assignmentData)
      .then((res) =>
        dispatch({
          type: UPDATE_ASSIGNMENT,
          payload: res.data.detail,
        })
      )
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.error,
        })}
      );
      
  };

//Delete Assignment by id
export const deleteAssignment = (id) => (dispatch) => {
    axios
      .delete(`/api/assignment/${id}`)
      .then((res) =>
        dispatch({
          type: DELETE_ASSIGNMENT,
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
export const setAssignmentLoading = () => {
    return {
      type: ASSIGNMENT_LOADING,
    };
  };