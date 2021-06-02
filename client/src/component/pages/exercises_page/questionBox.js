import React, { Component } from "react";
import QuestionItem from "./questionItem"
class QuestionBox extends Component {
  render() {
    const { questionsByAssignment } = this.props;
    return questionsByAssignment.map((question) => (
      <QuestionItem key={question._id} question={question}></QuestionItem>
    ));
  }
}
export default QuestionBox;
