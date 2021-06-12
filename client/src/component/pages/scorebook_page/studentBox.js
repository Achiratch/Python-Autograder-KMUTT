import React, { Component } from "react";
import StudentItem from "./studentItem";
export default class StudentBox extends Component {
  render() {
    const { questions } = this.props;
    return questions.map((question) => (
      <StudentItem
        key={question._id}
        question={question}
      ></StudentItem>
    ));
  }
}
