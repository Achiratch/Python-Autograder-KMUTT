import React, { Component } from "react";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
//ANTD
import { Tag } from "antd";

//Material-UI
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import StarsIcon from "@material-ui/icons/Stars";
import GradeIcon from "@material-ui/icons/Grade";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
class StudentItem extends Component {
  render() {
    const { question } = this.props;
    let studentItem;
    if (question.studentScore) {
      studentItem = (
        <div className="flex question-boxs">
          <div className="name-group">
            <h1 className="name">
              <span id="lightCheck" className="icon-button">
                <CheckCircleIcon style={{ fontSize: 25 }} />
              </span>
              {question.name}
            </h1>
          </div>
          <div className="score-group">
            <h1 className="level">
              <span className="icon-button">
                <StarsIcon />
              </span>
              {question.studentScore} / {question.score} Score
            </h1>
          </div>
          <div id="level-box">
            <h3 className="level">
              <Tag
                className={`${question.status}`}
                id={`tag-${question.status}`}
              >
                {question.status}
              </Tag>
            </h3>
          </div>
          {this.props.auth.user.id === question.createdBy._id ? (
            <Link
              to={`/scorebook/${question.course}/${question.assignment}/${question.question}/${question.scoreID}/edit`}
            >
              <div className="button-train">
                <button className="question-edit-button">
                  <span className="icon-button">
                    <EditIcon />
                  </span>
                  EDIT SCORE
                </button>
              </div>
            </Link>
          ) : (
            <div className="button-train">
              <button className="question-edit-button-disable">
                <span className="icon-button">
                  <EditIcon />
                </span>
                EDIT SCORE
              </button>
            </div>
          )}
        </div>
      );
    } else {
      studentItem = (
        <div className="flex question-boxs">
          <div className="name-group">
            <h1 className="name">
              <span id="lightcancel" className="icon-button">
                <RemoveCircleIcon style={{ fontSize: 25 }} />
              </span>
              {question.name}
            </h1>
          </div>
          <div className="score-group">
            <h1 className="level">
              <span className="icon-button">
                <StarsIcon />
              </span>
              &nbsp;&nbsp; 0 / {question.score} Score
            </h1>
          </div>
          <div id="level-box">
            <h3 className="level">
              <Tag id={`tag-Incomplete`}>Incomplete</Tag>
            </h3>
          </div>

          <div className="button-train">
            <button className="question-edit-button-disable">
              <span className="icon-button">
                <EditIcon />
              </span>
              EDIT SCORE
            </button>
          </div>
        </div>
      );
    }
    return <>{studentItem}</>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(StudentItem);
