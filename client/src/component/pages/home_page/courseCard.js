import React, { Component } from "react";
import CourseItem from "./courseItem";

//PropTypes
import PropTypes from "prop-types";
import { Col } from "antd";

class CourseCard extends Component {

  render() {
    const { courses } = this.props;
    return courses.map(course => (<Col span={8}><CourseItem key={course._id} course={course} /></Col>
      ));
  }
}

CourseCard.propTypes = {
  course: PropTypes.array.isRequired,
};

export default CourseCard;
