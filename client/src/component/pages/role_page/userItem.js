import React, { Component } from "react";
import { Tag } from "antd";
import EditRole from "./editRole"
//Material-UI
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { connect } from "react-redux";
export default class UserItem extends Component {
  render() {
    const { user } = this.props;
    return (
      <>
        <div className="flex question-box">
          <div className="id-group">
            <h1 className="name">
              <span id="" className="icon-button">
                <PersonIcon style={{ fontSize: 25 }} />
              </span>
              {user.studentID}
            </h1>
          </div>

          <div className="user-group">
            <h2 className="createby">
              {user.firstName} {user.lastName}
            </h2>
          </div>
          <div className="email-group">
            <h1 className="level">{user.email}</h1>
          </div>
          <div className="role-group" id="level-box">
            <h3 className="level">
              <Tag className={`${user.role}`} id={`tag-${user.role}`}>
                {user.role}
              </Tag>
            </h3>
          </div>
          <div className="button-group">
            <EditRole user={user}/>
          </div>
        </div>
      </>
    );
  }
}
