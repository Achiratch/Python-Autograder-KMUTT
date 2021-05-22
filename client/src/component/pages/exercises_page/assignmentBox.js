import React, { Component } from "react";
import AssignmentItem from "./assignmentItem";

class AssignmentBox extends Component {
  render() {
    const { assignments } = this.props;
    return assignments.map((assignment) => (
      <AssignmentItem
        key={assignment._id}
        assignment={assignment}
      ></AssignmentItem>
    ));
  }
}
export default AssignmentBox;
