import axios from "axios";
import { ADD_COURSE, GET_ERRORS, GET_COURSES,GET_COURSE, COURSE_LOADING } from "./type";

//Create Course
export const addCourse = (courseData) => (dispatch) => {
  axios
    .post("/api/course", courseData)
    .then((res) =>
      dispatch({
        type: ADD_COURSE,
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
//Get Course
export const getCourse = (id) => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .get(`/api/course/${id}`)
    .then((res) =>
      dispatch({
        type: GET_COURSE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_COURSE,
        payload: null,
      })
    );
};

//Get Courses
export const getCourses = () => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .get("/api/course")
    .then((res) =>
      dispatch({
        type: GET_COURSES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_COURSES,
        payload: null,
      })
    );
};



//Set loading state
export const setCourseLoading = () => {
  return {
    type: COURSE_LOADING,
  };
};
