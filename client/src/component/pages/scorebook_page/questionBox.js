import React, { Component } from "react";
import QuestionItem from "./questionItem";
class QuestionBox extends Component {
  render() {
    const { students, assignmentId } = this.props;
    return students.map((student) => (
      <QuestionItem
        key={student._id}
        student={student}
        assignmentId={assignmentId}
      ></QuestionItem>
    ));
  }
}
export default QuestionBox;
