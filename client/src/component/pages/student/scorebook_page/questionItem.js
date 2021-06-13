import React, { Component } from "react";
import { Link } from "react-router-dom";
//Material-UI
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import StarsIcon from "@material-ui/icons/Stars";
import GradeIcon from "@material-ui/icons/Grade";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
class QuestionItem extends Component {
  render() {
    const { question, assignmentId } = this.props;
    let questionItem;
    if (question.myScore) {
      questionItem = (
        <div className="flex question-boxs">
          <div className="name-group">
            <h1 className="name">
              <span id="lightCheck" className="icon-button">
                <CheckCircleIcon style={{ fontSize: 25 }} />
              </span>
              {question.name}
            </h1>
          </div>
          <div className="createby-group">
            <h2 className="createby">
              <span className="icon-button">
                <PersonIcon />
              </span>
              {question.createdBy.firstName}
            </h2>
          </div>
          <div className="level-group">
            <h1 className="level">
              <span className="icon-button">
                <StarsIcon />
              </span>
              {question.myScore} / {question.score} Score
            </h1>
          </div>
          <div className="level-group">
            <h1 id={"level-" + question.level} className="level">
              Level {question.level}
            </h1>
          </div>
        </div>
      );
    } else {
      questionItem = (
        <div className="flex question-boxs">
          <div className="name-group">
            <h1 className="name">
              <span id="lightcancel" className="icon-button">
                <RemoveCircleIcon style={{ fontSize: 25 }} />
              </span>
              {question.name}
            </h1>
          </div>
          <div className="createby-group">
            <h2 className="createby">
              <span className="icon-button">
                <PersonIcon />
              </span>
              {question.createdBy.firstName}
            </h2>
          </div>
          <div className="level-group">
            <h1 className="level">
              <span className="icon-button">
                <StarsIcon />
              </span>
              &nbsp;0&nbsp; / {question.score} Score
            </h1>
          </div>
          <div className="level-group">
            <h1 id={"level-" + question.level} className="level">
              Level {question.level}
            </h1>
          </div>
        </div>
      );
    }
    return <>{questionItem}</>;
  }
}
export default QuestionItem;
