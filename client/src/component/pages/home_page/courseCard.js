import React, { Component } from "react";
import CourseItem from "./courseItem";

//PropTypes
import PropTypes from "prop-types";

class CourseCard extends Component {

  render() {
    const { courses, data } = this.props;
    console.log(courses);
    console.log(data);

    return data.map(course => (<CourseItem key={course._id} course={course} />
      ));
  }
}

CourseCard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CourseCard;
