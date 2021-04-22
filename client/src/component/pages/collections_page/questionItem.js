import React, { Component } from "react";
//Material-UI
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";

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
        <Popover content={content}  trigger="hover">
          <div className="flex question-box">
            <div className="exercise-name">
              <h1>
                <span className="icon-button">
                  <AssignmentIcon style={{ fontSize: 25 }} />
                </span>
                Exercise : {question.name}
              </h1>
            </div>

            <div className="exercise-name">
              <h2>
                <span className="icon-button">
                  <PersonIcon />
                </span>
                Bill Gate
              </h2>
            </div>
            <div className="exercise-name">
              <h1 id={"level-" + question.level}>Level {question.level}</h1>
            </div>
            <div className="exercise-name ">
              <button className="question-button">
                <span className="icon-button">
                  <EqualizerIcon />
                </span>
                TRAIN NOW
              </button>
            </div>
          </div>
        </Popover>

        <div className="flex question-box">
          <div className="exercise-name">
            <h1>
              <span className="icon-button">
                <AssignmentIcon style={{ fontSize: 25 }} />
              </span>
              Exercise : Python Calculator
            </h1>
          </div>

          <div className="exercise-name">
            <h2>
              <span className="icon-button">
                <PersonIcon />
              </span>
              Bill Gate
            </h2>
          </div>
          <div className="exercise-name">
            <h1>Level 5</h1>
          </div>
          <div className="exercise-name ">
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
