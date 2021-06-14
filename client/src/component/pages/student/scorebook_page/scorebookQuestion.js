import React, { Component } from "react";
import Footer from "../../../layout/footer";
import Navbar from "../../../layout/navbarStudent";
import Sidebar from "../../../layout/sidebarStudent";
import { Link } from "react-router-dom";
//CSS
import "../../exercises_page/exercises_page.css";
import QuestionBox from "./questionBox"

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

class ScorebookQuestion extends Component {
  componentDidMount() {
    this.props.getCourse(this.props.match.params.courseId)
    this.props.getAssignment(this.props.match.params.assignmentId);
    this.props.getQuestionsByAssignmentId(this.props.match.params.assignmentId);
    this.props.getStatusQuestions(this.props.match.params.assignmentId);
  }
  render() {
    const { course } = this.props;
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
              q.myScore = s.score
            }
          }
        }
        console.log(questions)
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
                  <Link to={`/scorebook/${assignment.course}/student`}>
                    Score Book
                  </Link>
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
  assignment: state.assignment,
  status: state.status,
});

export default connect(mapStateToProps, {
  getCourse,
  getAssignment,
  getQuestion,
  getQuestionsByAssignmentId,
  getStatusQuestions,
})(ScorebookQuestion);
