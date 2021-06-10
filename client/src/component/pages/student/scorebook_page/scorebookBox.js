import React, { Component } from "react";
import ScorebookItem from "./scorebookItem"
class ScorebookBox extends Component {
  render() {
    const { assignments } = this.props;
    return assignments.map((assignment) => (
      <ScorebookItem
        key={assignment._id}
        assignment={assignment}
      ></ScorebookItem>
    ));
  }
}
export default ScorebookBox;
