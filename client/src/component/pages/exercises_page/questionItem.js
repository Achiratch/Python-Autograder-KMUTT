import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material-UI
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

//Redux
import { connect } from "react-redux";

class QuestionItem extends Component {
  render() {
    const { question, auth } = this.props;
    return (
      <div>
        <div className="flex question-boxs">
          <div className="name-group">
            <h1 className="name">
              <span className="icon-button">
                <AssignmentIcon style={{ fontSize: 25 }} />
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
            <h1 id={"level-" + question.level} className="level">
              Level {question.level}
            </h1>
          </div>
          {question.createdBy._id === auth.user.id ? (
            <div className="button-group"></div>
          ) : null}

          <Link to={`/collections/question/${question._id}`}>
            <div className="button-train">
              <button className="question-button">
                <span className="icon-button">
                  <EqualizerIcon />
                </span>
                TRAIN NOW
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(QuestionItem);
