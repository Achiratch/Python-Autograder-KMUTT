import React, { Component } from "react";
import DeleteConfirm from "./deleteConfirm";
//Material-UI
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
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
              Bill Gate
            </h2>
          </div>
          <div className="level-group">
            <h1 id={"level-" + question.level} className="level">
              Level {question.level}
            </h1>
          </div>
          <div className="button-group">
            <IconButton aria-label="edit" size="medium">
              <EditIcon />
            </IconButton>
            <DeleteConfirm question={question} />
          </div>
          <div className="button-train">
            <button className="question-button">
              <span className="icon-button">
                <EqualizerIcon />
              </span>
              TRAIN NOW
            </button>
          </div>
        </div>

        <div className="flex question-box">
          <div className="name-group">
            <h1 className="name">
              <span className="icon-button">
                <AssignmentIcon style={{ fontSize: 25 }} />
              </span>
              Exercise : Python Calculator
            </h1>
          </div>

          <div className="createby-group">
            <h2 className="createby">
              <span className="icon-button">
                <PersonIcon />
              </span>
              Inam Wannafly
            </h2>
          </div>
          <div className="level-group">
            <h1 className="level">Level 5</h1>
          </div>
          <div className="button-group">
            <IconButton aria-label="edit" size="medium">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" color="secondary" size="medium">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="button-train">
            <button className="question-button">
              <span className="icon-button">
                <EqualizerIcon />
              </span>
              TRAIN NOW
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default QuestionItem;
