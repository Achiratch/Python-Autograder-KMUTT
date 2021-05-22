import React, { Component } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
import AddExercise from "./addExerciseForm";
import AssignmentBox from "./assignmentBox";
//CSS
import "./exercises_page.css";

//ANTD
import { Breadcrumb } from "antd";

//Material-UI
import DeleteIcon from "@material-ui/icons/Delete";
import { LinearProgress } from "@material-ui/core";

//Material-UI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../../redux/actions/courseActions";
import {
  getStudents,
  getAllStudents,
} from "../../../redux/actions/memberAction";
import { getAssignments } from "../../../redux/actions/assignmentActions";

//PropTypes
import { PropTypes } from "prop-types";

class ExercisesPage extends Component {
  componentDidMount() {
    this.props.getCourse(this.props.match.params.id);
    this.props.getStudents(this.props.match.params.id, "");
    this.props.getAllStudents(this.props.match.params.id, "");
    this.props.getAssignments("");
  }
  render() {
    const { course, auth } = this.props;
    const { loading, assignments } = this.props.assignment;
    console.log(loading);
    console.log(assignments);
    let assignmentBox;
    if (loading === true) {
      assignmentBox = <LinearProgress />;
    } else {
      assignmentBox = <AssignmentBox assignments={assignments} />;
    }
    return (
      <div>
        <Navbar />
        <div className="body">
          <Sidebar course={course} />
          <div className="page-content">
            <div className="head-content-member">
              <h1>Assignment</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/home">My Course</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.props.course.course.courseID}
                </Breadcrumb.Item>
                <Breadcrumb.Item>Assignment </Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="flex">
              {course.course.createdBy === auth.user.id ? (
                <div className="button-exercises flex">
                  <AddExercise />
                  {/* <button className="delete-exercises-button">
                  <span className="icon-button">
                    <DeleteIcon />
                  </span>
                  Delete Assignment
                </button> */}
                </div>
              ) : null}
              <div className="search-assignment">
                <div className="search-assignment">
                  <div className="space-between-field">
                    <FormControl
                      variant="outlined"
                      className="space-between-field"
                    >
                      <TextField
                        // value={this.state.value}
                        // onChange={this.filterByInput}
                        autoComplete="off"
                        size="small"
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        style={{ margin: 0 }}
                      />
                    </FormControl>
                  </div>
                  <div className="space-between-field">
                    <FormControl variant="outlined" size="small">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Level
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        //value={this.state.level}
                        // onChange={this.filterByLevel}
                        label="Level"
                        style={{ width: 100 }}
                      >
                        <MenuItem value={""}>All</MenuItem>
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                        <MenuItem value={"3"}>3</MenuItem>
                        <MenuItem value={"4"}>4</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="space-between-field">
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      //onClick={this.filter}
                    >
                      <SearchIcon fontSize="medium" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {assignmentBox}
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
  assignment: state.assignment,
});

export default connect(mapStateToProps, {
  getCourse,
  getStudents,
  getAllStudents,
  getAssignments,
})(ExercisesPage);
