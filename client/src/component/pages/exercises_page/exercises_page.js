import React, { Component } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
import AddExercise from "./addExerciseForm";
//CSS
import "./exercises_page.css";

//ANTD
import { Breadcrumb } from "antd";

//Material-UI
import DeleteIcon from "@material-ui/icons/Delete";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../../redux/actions/courseActions";
import {
  getStudents,
  getAllStudents,
} from "../../../redux/actions/memberAction";

//PropTypes
import { PropTypes } from "prop-types";

class ExercisesPage extends Component {
  componentDidMount() {
    this.props.getCourse(this.props.match.params.id);
    this.props.getStudents(this.props.match.params.id,"");
    this.props.getAllStudents(this.props.match.params.id,"");
  }
  render() {
    const { course, auth } = this.props;
    console.log(auth);
    console.log(course);
    return (
      <div>
        <Navbar />
        <div className="body">
          <Sidebar course={course} />
          <div className="page-content">
            <div className="head-content-member">
              <h1>Exercise</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/home">My Course</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.props.course.course.courseID}
                </Breadcrumb.Item>
                <Breadcrumb.Item>Exercise</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {course.course.createdBy === auth.user.id ? (
              <div className="button-exercises flex">
                <AddExercise />
                <button className="delete-exercises-button">
                  <span className="icon-button">
                    <DeleteIcon />
                  </span>
                  Delete Exercise
                </button>
              </div>
            ) : null}

            <div className="flex execercise-box">
              <div className="exercise-name">
                <h1>
                  <span id="light" className="icon-button">
                    <EmojiObjectsIcon style={{ fontSize: 25 }} />
                  </span>
                  Exercise : Python Calculator
                </h1>
                <h2>By Bill Gate</h2>
              </div>
              <div className="exercise-name">
                <h1>Due Date</h1>
                <h2>25/8/2020 at 12.00 PM</h2>
              </div>
              <div className="exercise-name ">
                <button className="stat-button">
                  <span className="icon-button">
                    <EqualizerIcon />
                  </span>
                  Stat
                </button>
              </div>
            </div>
            <div className="flex execercise-box">
              <div className="exercise-name">
                <h1>
                  <span id="light" className="icon-button">
                    <EmojiObjectsIcon style={{ fontSize: 25 }} />
                  </span>
                  Exercise : Python Calculator
                </h1>
                <h2>By Bill Gate</h2>
              </div>
              <div className="exercise-name">
                <h1>Due Date</h1>
                <h2>25/8/2020 at 12.00 PM</h2>
              </div>
              <div className="exercise-name ">
                <button className="stat-button">
                  <span className="icon-button">
                    <EqualizerIcon />
                  </span>
                  Stat
                </button>
              </div>
            </div>
            <div className="flex execercise-box">
              <div className="exercise-name">
                <h1>
                  <span id="light" className="icon-button">
                    <EmojiObjectsIcon style={{ fontSize: 25 }} />
                  </span>
                  Exercise : Python Calculator
                </h1>
                <h2>By Bill Gate</h2>
              </div>
              <div className="exercise-name">
                <h1>Due Date</h1>
                <h2>25/8/2020 at 12.00 PM</h2>
              </div>
              <div className="exercise-name ">
                <button className="stat-button">
                  <span className="icon-button">
                    <EqualizerIcon />
                  </span>
                  Stat
                </button>
              </div>
            </div>
            <div className="flex execercise-box">
              <div className="exercise-name">
                <h1>
                  <span id="light" className="icon-button">
                    <EmojiObjectsIcon style={{ fontSize: 25 }} />
                  </span>
                  Exercise : Python Calculator
                </h1>
                <h2>By Bill Gate</h2>
              </div>
              <div className="exercise-name">
                <h1>Due Date</h1>
                <h2>25/8/2020 at 12.00 PM</h2>
              </div>
              <div className="exercise-name ">
                <button className="stat-button">
                  <span className="icon-button">
                    <EqualizerIcon />
                  </span>
                  Stat
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
ExercisesPage.propTypes = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCourse,
  getStudents,
  getAllStudents,
})(ExercisesPage);
