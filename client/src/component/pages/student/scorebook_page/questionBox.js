import React, { Component } from "react";
import QuestionItem from "./questionItem";
class QuestionBox extends Component {
  render() {
    const { questions, assignmentId } = this.props;
    return questions.map((question) => (
      <QuestionItem
        key={question._id}
        question={question}
        assignmentId={assignmentId}
      ></QuestionItem>
    ));
  }
}
export default QuestionBox;
