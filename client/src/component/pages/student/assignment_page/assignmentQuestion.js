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
import { getQuestion } from "../../../../redux/actions/collectionAction";
import {
  getAssignment,
  getQuestionsByAssignmentId,
} from "../../../../redux/actions/assignmentActions";
class AssignmentQuestionPageStudent extends Component {
  componentDidMount() {
    this.props.getAssignment(this.props.match.params.id);
    if (this.props.assignment.loading !== true) {
      console.log(this.props.assignment.questions);
    }
    const id = [
      "609fe9f195c48b7e005faec3",
      "609fe9ed95c48b7e005faec1",
      "609fe9e995c48b7e005faebf",
    ];
    id.map((i) => this.props.getQuestionsByAssignmentId(i));
    //this.props.getQuestionsByAssignmentId("");
    // if (this.props.assignment.loading === false) {
    //   console.log(this.props.assignment.assignment);
    // }
    // for (let i = 0; i < 2; i++) {
    //   console.log(i);
    // }

    //console.log(this.props.assignment.assignment.questions[0]._id)
    //this.props.getQuestion(this.props.)
  }
  //    UNSAFE_componentWillReceiveProps(newProps) {
  //     if(newProps.assignment.loading === false){
  //         const length = newProps.assignment.questions.length;
  //         console.log(length)
  //         for(let i = 0; i < length; i++){
  //             console.log("Questions",newProps.assignment.questions[i]);
  //             //this.props.getQuestionsByAssignmentId()
  //         }
  //     }
  //     if(this.props.assignment.loading !== true){
  //         console.log(this.props.assignment.questions)
  //     }
  //    }
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
                <Breadcrumb.Item><Link to={`/home/student`}>My Course</Link></Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.props.course.course.courseID}
                </Breadcrumb.Item>
                <Breadcrumb.Item><Link to={`/assignment/${assignment.course}/student`}>Assignment</Link></Breadcrumb.Item>
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
});
export default connect(mapStateToProps, {
  getAssignment,
  getQuestion,
  getQuestionsByAssignmentId,
})(AssignmentQuestionPageStudent);