import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material-UI
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import VisibilityIcon from "@material-ui/icons/Visibility";
import moment from "moment";

class AssignmentItem extends Component {
  render() {
    const { assignment } = this.props;
    return (
      <div>
        <div className="flex execercise-box">
          <div className="exercise-name">
            <h1>
              <span id="light" className="icon-button">
                <EmojiObjectsIcon style={{ fontSize: 25 }} />
              </span>
              {assignment.type} : {assignment.name}
            </h1>
            <h2>
              By {assignment.createdBy.firstName + " "}
              {assignment.createdBy.lastName} on{" "}
              {moment(assignment.dateCreate).format("LL")}
            </h2>
          </div>
          <div className="pub-date">
            <h1>Publish Date</h1>
            <h2>{moment(assignment.dateCreate).format("LLL")}</h2>
          </div>
          <div className="due-date">
            <h1>Due Date</h1>
            <h2>{moment(assignment.dueDate).format("LLL")}</h2>
          </div>
          <div className="level-assignment" id="level-box">
            <h3 id={"level-" + assignment.level} className="level">
              Level {assignment.level}
            </h3>
          </div>
          <Link to={`/assignment/${assignment.course}/${assignment._id}`}>
            <div className="exercise-name">
              <button className="stat-button">
                <span className="icon-button">
                  <VisibilityIcon />
                </span>
                VIEW
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default AssignmentItem;
