import React, { Component } from "react";
//Material-UI
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import BuildIcon from "@material-ui/icons/Build";
import Tooltip from "@material-ui/core/Tooltip";

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
              Assignment : {assignment.name}
            </h1>
            <h2>
              By {assignment.createdBy.firstName}{" "}
              {assignment.createdBy.lastName} on {assignment.dateCreate}
            </h2>
          </div>
          <div className="due-date">
            <h1>Due Date</h1>
            <h2>25/8/2020 at 12.00 PM {assignment.dueDate}</h2>
          </div>
          <div className="tool-box">
            <Tooltip title="Edit">
              <IconButton aria-label="edit">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" color="secondary">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="exercise-name">
            <button className="stat-button">
              <span className="icon-button">
                <EqualizerIcon />
              </span>
              Stat
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AssignmentItem;
