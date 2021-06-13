import axios from "axios";
import {
  GET_ASSIGNMENT,
  GET_ASSIGNMENTS,
  ADD_ASSIGNMENT,
  SUBMIT_QUESTION,
  GET_QUESTIONS_BY_ASSIGNMENT,
  GET_QUESTION_IN_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  ASSIGNMENT_LOADING,
  GET_ERRORS,
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
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Create Score via datacamp
export const submitQuestion = (questionData) => (dispatch) => {
  axios
    .post("/api/score/create", questionData)
    .then((res) =>
      dispatch({
        type: SUBMIT_QUESTION,
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
    .get(`/api/assignment`)
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

//Get all Assignments by course id
export const getAssignmentsByCourseId = (search, level, id) => (dispatch) => {
  dispatch(setAssignmentLoading());
  axios
    .get(`/api/assignment/course/${id}?search=${search}&level=${level}`)
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
//Get questions by assignment id
export const getQuestionsByAssignmentId = (id) => (dispatch) => {
  dispatch(setAssignmentLoading());
  axios
    .get(`/api/assignment/${id}/questions`)
    .then((res) =>
      dispatch({
        type: GET_QUESTIONS_BY_ASSIGNMENT,
        payload: res.data.detail,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: null,
      });
    });
};
// Get question in assignment
export const getQuestionsInAssignment =
  (assignmentId, questionId) => (dispatch) => {
    dispatch(setAssignmentLoading());
    axios
      .get(`/api/assignment/${assignmentId}/question/${questionId}`)
      .then((res) =>
        dispatch({
          type: GET_QUESTION_IN_ASSIGNMENT,
          payload: res.data.detail,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_QUESTION_IN_ASSIGNMENT,
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
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.error,
      });
    });
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
