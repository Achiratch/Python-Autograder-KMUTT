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
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_QUESTION,
        payload: err.response.data,
      })
    );
};
//Get all Questions
export const getQuestions = () => (dispatch) => {
  dispatch(setQuestionLoading());
  axios
    .get("/api/question")
    .then((res) =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data.detail,
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