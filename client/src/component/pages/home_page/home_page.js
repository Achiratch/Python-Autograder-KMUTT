import React, { Component } from "react";
import CourseCard from "./courseCard";
//Layout
import Navbar from "../../layout/navbar";
import Footer from "../../layout/footer";

//ANTD
import { Col, Row } from "antd";

//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

//Dialog Form
import CourseFrom from "./courseForm";

//Redux
import { connect } from "react-redux";
import {
  getCourses,
  createCourse,
} from "../../../redux/actions/createCourseActions";

//PropTypes
import { PropTypes } from "prop-types";

//Style-Course-Card
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class HomePage extends Component {
  componentDidMount() {
    this.props.getCourses();
  }
  render() {
    const { courses, loading } = this.props.course;
    const { data } = this.props.data;
    let courseCard;
    if ((courses, data === null || loading)) {
      courseCard = <CircularProgress disableShrink />;
    } else {
      courseCard = <CourseCard courses={courses} data={data} />;
      console.log(data);
    }

    return (
      <div>
        <Navbar />
        <div className="body">
          {/* <div data-datacamp-exercise data-lang="python" data-height="500rem">
            <code data-type="pre-exercise-code">
              # This will get executed each time the exercise gets initialized b
              = 6
            </code>
            <code data-type="sample-code">
              # Create a variable a, equal to 5 # Print out a
            </code>
            <code data-type="solution"></code>
            <code data-type="sct">
              test_object("a") test_function("print") success_msg("Great job!")
            </code>

            <div data-type="hint">
              Use the assignment operator (<code>=</code>) to create the
              variable
              <code>a</code>.
            </div>
          </div>*/}
          <div className="page-content container">
            <div className="head-content ">
              <h1>My Course</h1>
            </div>
            <div className="site-card-wrapper">
              <Row gutter={16} className="space-card">
                <Col span={8}>
                  <CourseFrom />
                </Col>
                <Col span={8}>{courseCard}</Col>
              </Row>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.createCourse,
  data: state.createCourse.courses,
});

export default connect(mapStateToProps, { getCourses, createCourse })(HomePage);
