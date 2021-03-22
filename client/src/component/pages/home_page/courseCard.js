import React, { Component } from "react";
import CourseItem from "./courseItem";

//PropTypes
import PropTypes from "prop-types";

class CourseCard extends Component {

  render() {
    const { courses } = this.props;
    return courses.map(course => (<CourseItem key={course._id} course={course} />
      ));
  }
}

CourseCard.propTypes = {
  course: PropTypes.array.isRequired,
};

export default CourseCard;
