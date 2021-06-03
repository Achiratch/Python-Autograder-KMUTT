import React, { Component } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
import EditAssignment from "./editAssignment";
import DeleteAssignment from "./deleteAssignment";
import QuestionBox from "./questionBox";
import { Link } from "react-router-dom";

//CSS
import "./exercises_page.css";

//ANTD
import { Breadcrumb } from "antd";

//Material-UI
import { LinearProgress } from "@material-ui/core";

//Redux
import { connect } from "react-redux";
import { getQuestion } from "../../../redux/actions/collectionAction";
import {
  getAssignment,
  getQuestionsByAssignmentId,
} from "../../../redux/actions/assignmentActions";
class AssignmentViewPage extends Component {
  componentDidMount() {
    this.props.getAssignment(this.props.match.params.id);
    console.log(this.props.match.params);
    this.props.getQuestionsByAssignmentId(this.props.match.params.id);
  }
  render() {
    const { course, auth } = this.props;
    const { loading, assignment, questions, questionsByAssignment } =
      this.props.assignment;
    let questionBox;
    if (loading === true || questionsByAssignment === null) {
      questionBox = <LinearProgress />;
    } else {
      console.log(questionsByAssignment);
      questionBox = (
        <QuestionBox questionsByAssignment={questionsByAssignment} />
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
                  <Link to={`/assignment/${assignment.course}`}>
                    Assignment
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{assignment.name}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="flex">
                <h1 id="title-name">{assignment.name}</h1>
                {course.course.createdBy === auth.user.id ? (
                  <div className="tool-button-assignment flex">
                    <EditAssignment assignment={assignment} />
                    <DeleteAssignment assignment={assignment} />
                  </div>
                ) : null}
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
});
export default connect(mapStateToProps, {
  getAssignment,
  getQuestion,
  getQuestionsByAssignmentId,
})(AssignmentViewPage);
