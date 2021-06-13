import React, { Component } from "react";
import QuestionItem from "./questionItem"
class QuestionBox extends Component {
  render() {
    const { questions } = this.props;
    return questions.map((question) => (
      <QuestionItem key={question._id} question={question}></QuestionItem>
    ));
  }
}
export default QuestionBox;
