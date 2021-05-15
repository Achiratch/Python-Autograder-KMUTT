import axios from "axios";
import {
    GET_QUESTION,
    GET_QUESTIONS,
    ADD_QUESTION,
    DELETE_QUESTION,
    UPDATE_QUESTION,
    QUESTION_LOADING,
    GET_ERRORS
} from "./type";

//Create Question
export const addQuestion = (questionData) => (dispatch) => {
  axios
    .post("/api/question/create", questionData)
    .then((res) =>
      dispatch({
        type: ADD_QUESTION,
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
//Get all Questions
export const getQuestions = (search,level) => (dispatch) => {
  dispatch(setQuestionLoading());
  axios
    .get(`/api/question?search=${search}&level=${level}&limit=${""}&page=${1}`)
    .then((res) =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_QUESTIONS,
        payload: null,
      })
    );
};

//Get Question by id
export const getQuestion = (id) => (dispatch) => {
  dispatch(setQuestionLoading());
  axios
    .get(`/api/question/${id}`)
    .then((res) =>
      dispatch({
        type: GET_QUESTION,
        payload: res.data.detail,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_QUESTION,
        payload: null,
      })
    );
};

//Update Question by id
export const editQuestion = (id, questionData) => (dispatch) => {
  axios
    .put(`/api/question/${id}/edit`, questionData)
    .then((res) =>
      dispatch({
        type: UPDATE_QUESTION,
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

//Delete Question by id
export const deleteQuestion = (id) => (dispatch) => {
  axios
    .delete(`/api/question/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_QUESTION,
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
export const setQuestionLoading = () => {
    return {
      type: QUESTION_LOADING,
    };
  };