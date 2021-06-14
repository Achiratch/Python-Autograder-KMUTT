import React, { Component } from "react";
import Footer from "../../../layout/footer";
import Navbar from "../../../layout/navbarStudent";
import Sidebar from "../../../layout/sidebarStudent";
import { Link } from "react-router-dom";

import QuestionBox from "./questionBox";

//CSS
import "../../exercises_page/exercises_page.css";

//ANTD
import { Breadcrumb } from "antd";

//Material-UI
import { LinearProgress } from "@material-ui/core";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../../../redux/actions/courseActions";
import { getQuestion } from "../../../../redux/actions/collectionAction";
import {
  getAssignment,
  getQuestionsByAssignmentId,
} from "../../../../redux/actions/assignmentActions";
import { getStatusQuestions } from "../../../../redux/actions/statusActions";
class AssignmentQuestionPageStudent extends Component {
  componentDidMount() {
    this.props.getCourse(this.props.match.params.coureseId);
    this.props.getAssignment(this.props.match.params.assignmentId);
    this.props.getQuestionsByAssignmentId(this.props.match.params.assignmentId);
    this.props.getStatusQuestions(this.props.match.params.assignmentId);
  }

  render() {
    const { course, auth } = this.props;
    const { loading, assignment, questions } = this.props.assignment;
    const { statusQuestions } = this.props.status;
    let questionBox;
    if (loading === true)  {
      questionBox = <LinearProgress />;
    } else {
      if(statusQuestions !== null){
        for (const q of questions){
          for(const s of statusQuestions){
            if(q._id === s.question){
              q.status = s.sendingStatus
            }
          }
        }
      }
      questionBox = (
        <QuestionBox
          questions={questions}
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
                  <Link to={`/home/student`}>My Course</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.props.course.course.courseID}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/assignment/${assignment.course}/student`}>
                    Assignment
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{assignment.name}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="flex">
                <h1 id="title-name">{assignment.name}</h1>
                {/* {course.course.createdBy === auth.user.id ? (
                  <div className="tool-button-assignment flex">
                    <EditAssignment assignment={assignment} />
                    <DeleteAssignment assignment={assignment} />
                  </div>
                ) : null} */}
              </div>

              <h6 id="assignment-description">{assignment.type} Description</h6>
              <p className="description-p">{assignment.description}</p>
            </div>

            {/* <div className="flex">
              {course.course.createdBy === auth.user.id ? (
                <div className="button-exercises flex">
                  <EditAssignment assignment={assignment} />
                  <DeleteAssignment assignment={assignment} />
                </div>
              ) : null}
            </div> */}

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
  auth: state.auth,
  assignment: state.assignment,
  collection: state.collection,
  status: state.status,
});
export default connect(mapStateToProps, {
  getCourse,
  getAssignment,
  getQuestion,
  getQuestionsByAssignmentId,
  getStatusQuestions,
})(AssignmentQuestionPageStudent);
