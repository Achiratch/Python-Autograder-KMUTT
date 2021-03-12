import axios from "axios";
import { CREATE_COURSE, GET_ERRORS } from "./type";

//Create course
export const createCourse = (courseData) => (dispatch) => {
  axios
    .post("/api/course", courseData)
    .then((res) =>
      dispatch({
        type: CREATE_COURSE,
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
