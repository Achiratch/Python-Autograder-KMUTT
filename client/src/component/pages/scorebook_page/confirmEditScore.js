import React, { Component } from "react";
import { Link } from "react-router-dom";
//ANTD
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

//MATERIAL UI
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";

//Redux
import { connect } from "react-redux";
import { editScore } from "../../../redux/actions/statusActions";
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

class ConfirmEditScore extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  onSubmit() {
    const { scoreID, newScore } = this.props;
    const data = {
        score: newScore
    }
    this.props.editScore(data, scoreID);
    this.handleCancel();
    message.success(`Score ${this.props.question.name} has been edited.`);
  }
  render() {
    const { visible } = this.state;
    const { question, scoreID, newScore } = this.props;
    return (
      <>
        <ColorButton
          variant="contained"
          color="primary"
          onClick={this.showModal}
          startIcon={<EditIcon />}
        >
          Edit Score
        </ColorButton>
        <Modal
          closable={false}
          visible={visible}
          header={null}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div className="font">
            <ExclamationCircleOutlined
              className="icon"
              style={{ color: "#FFBB33", fontSize: "1.75rem" }}
            />
            <p className="text">Are you sure you want to edit score ?</p>
          </div>
          <div className="course">
            <p>Question:</p>
            <p className="course-name">{question.name}</p>
          </div>
          <div className="confirm-button">
            <button
              className="btn btn-primary cancel"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-success delete"
              onClick={this.onSubmit.bind(this)}
            >
              Submit
            </button>
          </div>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { editScore })(ConfirmEditScore);
