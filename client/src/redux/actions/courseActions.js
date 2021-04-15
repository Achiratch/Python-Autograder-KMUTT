import axios from "axios";
import {
  ADD_COURSE,
  GET_ERRORS,
  GET_COURSES,
  GET_COURSE,
  COURSE_LOADING,
  UPDATE_COURSE,
  DELETE_COURSE,
  GET_COURSES_BY_FILTER,
} from "./type";

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

//Get Courses By Filter
export const getCoursesByFilter = (
  search,
  semester,
  year
) => (dispatch) => {
  dispatch(setCourseLoading());
  axios
    .get(
      `/api/course?search=${search}&semester=${semester}&year=${year}`
    )
    .then((res) =>
      dispatch({
        type: GET_COURSES_BY_FILTER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_COURSES_BY_FILTER,
        payload: null,
      })
    );
};

//Update Course
export const editCourse = (id, courseData) => (dispatch) => {
  axios
    .put(`/api/course/${id}/update`, courseData)
    .then((res) => 
      dispatch({
        type: UPDATE_COURSE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Delete Course
export const deleteCourse = (id) => (dispatch) => {
  axios
    .delete(`/api/course/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_COURSE,
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
export const setCourseLoading = () => {
  return {
    type: COURSE_LOADING,
  };
};
