import React, { Component } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
import { Link } from "react-router-dom";
import QuestionBox from "./questionBox";
//CSS
import "../exercises_page/exercises_page.css";

//ANTD
import { Breadcrumb } from "antd";

//Material-UI
import { LinearProgress } from "@material-ui/core";

//Redux
import { connect } from "react-redux";
import {
  getAssignment,
  getQuestionsByAssignmentId,
} from "../../../redux/actions/assignmentActions";
import { getSendingStatusAssignments } from "../../../redux/actions/statusActions";
import { getStudents } from "../../../redux/actions/memberAction";
class ScorebookAllQuestion extends Component {
  componentDidMount() {
    this.props.getAssignment(this.props.match.params.assignmentId);
    this.props.getQuestionsByAssignmentId(this.props.match.params.assignmentId);
    this.props.getStudents(this.props.match.params.courseId, "");
    this.props.getSendingStatusAssignments(
      this.props.match.params.courseId,
      this.props.match.params.assignmentId
    );
  }
  render() {
    const { course } = this.props;
    const { loading, assignment } = this.props.assignment;
    const { statusQuestions } = this.props.status;
    const { students } = this.props.member;
    let questionBox;
    if (loading === true) {
      questionBox = <LinearProgress />;
    } else {
      if (statusQuestions.length !== 0) {
        for (const m of students) {
          for (const s of statusQuestions) {
            if (m.student.studentID === s.student.studentID) {
              m.studentScore = s.score;
              m.status = s.sendingStatus;
            }
          }
        }
      }
      questionBox = (
        <QuestionBox
          students={students}
          assignmentId={this.props.match.params.assignmentId}
        />
      );
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
                  <Link to={`/home`}>My Course</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.props.course.course.courseID}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/scorebook/${assignment.course}`}>Score Book</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{assignment.name}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="flex">
                <h1 id="title-name">{assignment.name}</h1>
              </div>
            </div>
            {questionBox}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  course: state.course,
  member: state.member,
  assignment: state.assignment,
  status: state.status,
});
export default connect(mapStateToProps, {
  getAssignment,
  getQuestionsByAssignmentId,
  getSendingStatusAssignments,
  getStudents,
})(ScorebookAllQuestion);
