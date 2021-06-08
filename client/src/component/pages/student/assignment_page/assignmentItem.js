import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material-UI
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CodeIcon from "@material-ui/icons/Code";
import moment from "moment";

//ANTD
import { Tag } from "antd";

class AssignmentItem extends Component {
  render() {
    const { assignment } = this.props;
    let assignmentItem;
    if (assignment.status) {
      assignmentItem = (
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
              {assignment.createdBy.lastName}
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
          <div id="level-box">
            <h3 id={"level-" + assignment.level} className="level">
              Level {assignment.level}
            </h3>
          </div>
          <div className="tag">
            <h3 className="level">
              <Tag id={`tag-${assignment.status}`}>{assignment.status}</Tag>
            </h3>
          </div>
          <div className="exercise-name">
            <Link
              to={`/assignment/${assignment.course}/${assignment._id}/student`}
            >
              <button className="code-button">
                <span className="icon-button">
                  <CodeIcon />
                </span>
                Code
              </button>
            </Link>
          </div>
        </div>
      );
    } else {
      assignmentItem = (
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
              {assignment.createdBy.lastName}
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
          <div id="level-box">
            <h3 id={"level-" + assignment.level} className="level">
              Level {assignment.level}
            </h3>
          </div>
          <div className="tag">
            <h3 className="level">
              <Tag id={`tag-Complete`}>New</Tag>
            </h3>
          </div>
          <div className="exercise-name">
            <Link
              to={`/assignment/${assignment.course}/${assignment._id}/student`}
            >
              <button className="code-button">
                <span className="icon-button">
                  <CodeIcon />
                </span>
                Code
              </button>
            </Link>
          </div>
        </div>
      );
    }
    return <div>{assignmentItem}</div>;
  }
}

export default AssignmentItem;
