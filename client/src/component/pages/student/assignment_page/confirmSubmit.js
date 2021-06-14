import React, { Component } from "react";
import { Link } from "react-router-dom";
//ANTD
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

//MATERIAL UI
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";

//Redux
import { connect } from "react-redux";
import { submitQuestion } from "../../../../redux/actions/assignmentActions";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

class ConfirmSubmit extends Component {
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
    const { maxScore, questionId, courseId, assignmentId, correct, code } =
      this.props;
    let score;
    if (correct === true) {
      score = maxScore;
    } else {
      score = 0;
    }
    const data = {
      course: courseId,
      assignment: assignmentId,
      question: questionId,
      score: score,
      answer: code,
    };
    this.props.submitQuestion(data);
    this.handleCancel();
    message.success(`Question ${this.props.question.name} has been submited.`);
  }
  render() {
    const { visible } = this.state;
    const { question } = this.props;
    return (
      <>
        <ColorButton
          variant="contained"
          color="primary"
          startIcon={<DoneIcon />}
          onClick={this.showModal}
        >
          Submit Assignment
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
            <p className="text">
              Are you sure you want to submit this question ?
            </p>
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
            <Link to={`/assignment/${this.props.courseId}/student`}>
              <button
                className="btn btn-success delete"
                onClick={this.onSubmit.bind(this)}
              >
                Submit
              </button>
            </Link>
          </div>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { submitQuestion })(ConfirmSubmit);
