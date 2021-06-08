import React, { Component } from "react";
import Footer from "../../../layout/footer";
import Navbar from "../../../layout/navbarStudent";
import Sidebar from "../../../layout/sidebarStudent";
import AssignmentBox from "./assignmentBox";
import { Link } from "react-router-dom";

//CSS
import "../../exercises_page/exercises_page.css";

//ANTD
import { Breadcrumb } from "antd";

//Material-UI
import { LinearProgress } from "@material-ui/core";

//Material-UI
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../../../redux/actions/courseActions";
import {
  getStudents,
} from "../../../../redux/actions/memberAction";
import { getAssignmentsByCourseId } from "../../../../redux/actions/assignmentActions";
import { getStatusAssignments } from "../../../../redux/actions/statusActions"
//PropTypes
import { PropTypes } from "prop-types";

class AssignmentPageStudent extends Component {
  constructor(props) {
    super(props);
    this.filterByInput = this.filterByInput.bind(this);
    this.filterByLevel = this.filterByLevel.bind(this);
    this.filter = this.filter.bind(this);
    this.state = { value: "", level: "" };
  }
  filterByInput(e) {
    this.setState({ value: e.target.value });
  }
  filterByLevel(e) {
    this.setState({ level: e.target.value });
  }
  filter() {
    this.props.getAssignmentsByCourseId(
      this.state.value,
      this.state.level,
      this.props.match.params.id
    );
  }
  componentDidMount() {
    this.props.getCourse(this.props.match.params.id);
    this.props.getStudents(this.props.match.params.id, "");
    this.props.getAssignmentsByCourseId("", "", this.props.match.params.id);
    this.props.getStatusAssignments(this.props.match.params.id)
  }
  render() {
    const { course, auth } = this.props;
    const { questions } = this.props.collection;
    const { loading, assignments } = this.props.assignment;
    const { statusAssignments } = this.props.status;
    let assignmentBox;
    if (loading === true) {
      assignmentBox = (
        <div className="loading">
          <LinearProgress />
        </div>
      );
    } else {
      if(this.props.status.statusAssignments.length !== 0){
        for (const a of assignments){
          for(const s of statusAssignments){
            if(a._id === s.assignment){
              a.status = s.sendingStatus
            }
          }
        }
      }
      assignmentBox = <AssignmentBox assignments={assignments} />;
    }
    return (
      <div>
        <Navbar />
        <div className="body">
          <Sidebar course={course} />
          <div className="page-content">
            <div className="head-content-member">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`/home/student`}>My Course</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.props.course.course.courseID}
                </Breadcrumb.Item>
                <Breadcrumb.Item>Assignment </Breadcrumb.Item>
              </Breadcrumb>
              <h1 id="title-name">Assignment</h1>
            </div>

            <div className="flex">
              {/* {course.course.createdBy === auth.user.id  ? (
                <div className="button-exercises flex">
                  <AddExercise questions={questions}/>
                </div>
              ) : null} */}
              <div className="search-assignment">
                <div className="search-assignment">
                  <div className="space-between-field">
                    <FormControl
                      variant="outlined"
                      className="space-between-field"
                    >
                      <TextField
                        value={this.state.value}
                        onChange={this.filterByInput}
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
                        value={this.state.level}
                        onChange={this.filterByLevel}
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
                      onClick={this.filter}
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
AssignmentPageStudent.propTypes = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
  assignment: state.assignment,
  collection: state.collection,
  status: state.status,
});

export default connect(mapStateToProps, {
  getCourse,
  getStudents,
  getAssignmentsByCourseId,
  getStatusAssignments,
})(AssignmentPageStudent);
