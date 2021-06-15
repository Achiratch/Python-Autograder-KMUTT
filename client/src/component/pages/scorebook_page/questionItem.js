import React, { Component } from "react";
import { Link } from "react-router-dom";

//ANTD
import { Tag } from "antd";

//Material-UI
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import StarsIcon from "@material-ui/icons/Stars";
import GradeIcon from "@material-ui/icons/Grade";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

//Redux
import { connect } from "react-redux";
class QuestionItem extends Component {
  render() {
    const { student, assignmentId } = this.props;
    let questionItem;
    if (student.studentScore) {
      questionItem = (
        <div className="flex question-boxs">
          <div className="name-group">
            <h1 className="name">
              <span id="lightCheck" className="icon-button">
                <CheckCircleIcon style={{ fontSize: 25 }} />
              </span>
              {student.student.studentID}&nbsp;&nbsp;
            </h1>
          </div>
          <div className="flname-group">
            <h2 className="createby">
              <span className="icon-button">
                <PersonIcon />
              </span>
              {student.student.firstName}&nbsp;&nbsp;
              {student.student.lastName}
            </h2>
          </div>
          <div className="level-group">
            <h1 className="level">{Math.round(student.studentScore)} / 100</h1>
          </div>
          <div id="level-box">
            <h3 className="level">
              <Tag className={`${student.status}`} id={`tag-${student.status}`}>
                {student.status}
              </Tag>
            </h3>
          </div>
          <Link
            to={`/scorebook/${student.course}/${assignmentId}/${student.student._id}`}
          >
            <div className="button-train">
              <button className="question-button">
                <span className="icon-button">
                  <GradeIcon />
                </span>
                VIEW
              </button>
            </div>
          </Link>
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
              {student.student.studentID}&nbsp;&nbsp;
            </h1>
          </div>
          <div className="flname-group">
            <h2 className="createby">
              <span className="icon-button">
                <PersonIcon />
              </span>
              {student.student.firstName}&nbsp;&nbsp;
              {student.student.lastName}
            </h2>
          </div>
          <div className="level-group">
            <h1 className="level">&nbsp;&nbsp; 0 / 100</h1>
          </div>
          <div id="level-box">
            <h3 className="level">
              <Tag id={`tag-Incomplete`}>Incomplete</Tag>
            </h3>
          </div>
          <div className="button-train">
            <button className="question-button-disable">
              <span className="icon-button">
                <GradeIcon />
              </span>
              VIEW
            </button>
          </div>
        </div>
      );
    }
    return <div>{questionItem}</div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(QuestionItem);
