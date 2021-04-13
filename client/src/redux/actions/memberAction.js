import axios from "axios";
import {
    MEMBER_LOADING,
    GET_STUDENTS,
} from "./type"

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
          type: GET_STUDENTS,
          payload: null,
        })
      );
  };


//Set loading state
export const setStudentLoading = () => {
    return {
      type: MEMBER_LOADING,
    };
  };