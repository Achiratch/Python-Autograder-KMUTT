import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

//Material-UI
import GradeIcon from "@material-ui/icons/Grade";
export default class ScorebookItem extends Component {
  render() {
    const { assignment } = this.props;
    let scorebookItem;
    if (assignment) {
      scorebookItem = (
        <div className="flex execercise-box">
          <div className="exercise-name">
            <h1>
              <span id="light" className="icon-button">
                <GradeIcon style={{ fontSize: 25 }} />
              </span>
              {assignment.type} : {assignment.name}
            </h1>
            <h2>Published on: {moment(assignment.dateCreate).format("LLL")}</h2>
          </div>
          <div className="score-box">
            <h1>Total Score</h1>
            <h2>
              {assignment.totalScore}
            </h2>
          </div>
          <div className="level-assignment" id="level-box">
            <h3 id={"level-" + assignment.level} className="level">
              Level {assignment.level}
            </h3>
          </div>
          <div className="exercise-name">
            <Link
              to={`/scorebook/${assignment.course}/${assignment._id}`}
            >
              <button className="score-button">
                <span className="icon-button">
                  <GradeIcon />
                </span>
                Score
              </button>
            </Link>
          </div>
        </div>
      );
    }
    return <>{scorebookItem}</>;
  }
}
