import React, { Component } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
import { Link } from "react-router-dom";
import StudentBox from "./studentBox"
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
import { getSendingStatusByStudentId } from "../../../redux/actions/statusActions";

class ScorebookStudent extends Component {
  componentDidMount() {
    this.props.getQuestionsByAssignmentId(this.props.match.params.assignmentId);
    this.props.getSendingStatusByStudentId(
      this.props.match.params.assignmentId,
      this.props.match.params.studentId
    );
  }  
  render() {
    const { course } = this.props;
    const { loading, assignment, questions } = this.props.assignment;
    const { statusStudent } = this.props.status;
    const { students } = this.props.member
    let studentBox;
    if(loading === true){
        studentBox = <LinearProgress />;
    } else{
        if(statusStudent.lenght !==0){
            for(const q of questions){
                for(const s of statusStudent){
                    if(q._id === s.question){
                        q.studentScore = s.score
                        q.course = s.course
                        q.assignment = s.assignment
                        q.question = s.question
                        q.scoreID = s._id
                        q.status = s.sendingStatus
                        q.studentID = s.student
                    }
                }
            }
        }
        studentBox = (
            <StudentBox questions={questions}/>
        )
    }
    let studentID
    if(students){
        for (const s of students){
            if(s._id === this.props.match.params.studentId){
                 studentID = s.student.studentID
            }
        }
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
                <Breadcrumb.Item>
                  <Link
                    to={`/scorebook/${assignment.course}/${this.props.match.params.assignmentId}`}
                  >
                    {assignment.name}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{studentID}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="flex">
                <h1 id="title-name">{studentID}</h1>
              </div>
            </div>
            {studentBox}
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
  member: state.member,
});
export default connect(mapStateToProps, {
  getSendingStatusByStudentId,
  getQuestionsByAssignmentId,
})(ScorebookStudent);
