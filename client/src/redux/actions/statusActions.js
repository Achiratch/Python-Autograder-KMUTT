import axios from "axios";
import {
  UPDATE_ANSWER,
  GET_ANSWER,
  GET_STATUS_ASSIGNMENTS,
  GET_STATUS_QUESTIONS,
  GET_STATUS_BY_STUDENT,
  UPDATE_SCORE,
  STATUS_LOADING,
  GET_ERRORS,
} from "./type";

//Get Status by courseId
export const getStatusAssignments = (courseId) => (dispatch) => {
  dispatch(setStatusLoading());
  axios
    .get(`/api/score/student/course/${courseId}/status`)
    .then((res) =>
      dispatch({
        type: GET_STATUS_ASSIGNMENTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

//Get Sending status by course id and assignment id
export const getSendingStatusAssignments =
  (courseId, assignmentID) => (dispatch) => {
    dispatch(setStatusLoading());
    axios
      .get(`/api/score/course/${courseId}/assignment/${assignmentID}/status`)
      .then((res) =>
        dispatch({
          type: GET_STATUS_QUESTIONS,
          payload: res.data.detail,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_STATUS_QUESTIONS,
          payload: null,
        })
      );
  };

//Get Status by assignmentId
export const getStatusQuestions = (assignmentId) => (dispatch) => {
  dispatch(setStatusLoading());
  axios
    .get(`/api/score/student/assignment/${assignmentId}`)
    .then((res) =>
      dispatch({
        type: GET_STATUS_QUESTIONS,
        payload: res.data.detail,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_STATUS_QUESTIONS,
        payload: null,
      })
    );
};

//Get Answer by scoreId
export const getAnswer = (scoreId) => (dispatch) => {
  dispatch(setStatusLoading());
  axios
    .get(`/api/score/${scoreId}`)
    .then((res) =>
      dispatch({
        type: GET_ANSWER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

//Get Sending status by assignment id and student id
export const getSendingStatusByStudentId =
  (assignmentID, studentID) => (dispatch) => {
    dispatch(setStatusLoading());
    axios
      .get(`/api/score/assignment/${assignmentID}/student/${studentID}`)
      .then((res) =>
        dispatch({
          type: GET_STATUS_BY_STUDENT,
          payload: res.data.detail,
        })
      )
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      });
  };

//Update Answer by id
export const editAnswer = (questionData) => (dispatch) => {
  dispatch(setStatusLoading());
  axios
    .put(`/api/score/edit`, questionData)
    .then((res) =>
      dispatch({
        type: UPDATE_ANSWER,
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

//Update Score by score id
export const editScore = (newScore, scoreId) => (dispatch) => {
  dispatch(setStatusLoading());
  axios
    .put(`/api/score/${scoreId}/editscore`, newScore)
    .then((res) =>
      dispatch({
        type: UPDATE_SCORE,
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
export const setStatusLoading = () => {
  return {
    type: STATUS_LOADING,
  };
};
