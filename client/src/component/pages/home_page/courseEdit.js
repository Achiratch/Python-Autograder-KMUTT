import React, { Component } from "react";

//ANTD
import { Modal, message } from "antd";
import { ExclamationCircleOutlined, SettingOutlined } from "@ant-design/icons";

//Material-UI
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
//PropTypes
import { PropTypes } from "prop-types";

//Redux
import { connect } from "react-redux";
import { editCourse } from "../../../redux/actions/courseActions";

class CourseEdit extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { course } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <div className="edit-button">
          <IconButton size="small">
            <SettingOutlined style={{ fontSize: "18px" }} />
          </IconButton>
        </div>
      </div>
    );
  }
}
export default CourseEdit;
