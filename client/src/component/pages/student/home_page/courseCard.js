import React, { Component } from "react";
import CourseItem from "./courseItem";

//Material-UI
import Grid from "@material-ui/core/Grid";

//PropTypes
import PropTypes from "prop-types";

class CourseCard extends Component {

  render() {
    const { courses } = this.props;
    return courses.map(course => (<Grid key={course._id} item xs={4} lg={4} md={6} sm={12}><CourseItem  course={course} /></Grid>
      ));
  }
}

CourseCard.propTypes = {
 
};

export default CourseCard;
