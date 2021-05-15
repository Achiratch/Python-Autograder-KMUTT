import React, { Component } from "react";
import { Link } from "react-router-dom";
import DeleteConfirm from "./deleteConfirm";
import QuestionEdit from "./questionEdit"

//Material-UI
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

//ANTD
import { Popover } from "antd";

class QuestionItem extends Component {
  render() {
    const { question } = this.props;
    const content = (
      <div>
        <p>Description: {question.description}</p>
      </div>
    );
    return (
      <div>
        <div className="flex question-box">
          <div className="name-group">
            <h1 className="name">
              <span className="icon-button">
                <AssignmentIcon style={{ fontSize: 25 }} />
              </span>
              Exercise : {question.name}
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
          <div className="button-group">
            <QuestionEdit question={question}/>
            <DeleteConfirm question={question} />
          </div>
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
export default QuestionItem;
