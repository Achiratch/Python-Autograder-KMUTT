import React, { Component } from "react";
//ANTD
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

//Material-UI
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

//PropTypes
import { PropTypes } from "prop-types";

//Redux
import { connect } from "react-redux";
import { deleteQuestion } from "../../../redux/actions/collectionAction";

class DeleteConfirm extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  onDeleteClick(id) {
    this.props.deleteQuestion(id);
    this.handleCancel();
    message.success(`Question ${this.props.question.name} has been deleted.`);
  }
  render() {
    const { question } = this.props;
    const { visible } = this.state;
    return (
      <>
        <IconButton
          aria-label="delete"
          color="secondary"
          size="medium"
          onClick={this.showModal}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>

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
              Are you sure you want to delete this question ?
            </p>
          </div>
          <div className="course">
            <p>{question.name}</p>
            <p className="course-name">level {question.level}</p>
          </div>
          <div className="confirm-button">
            <button
              className="btn btn-outline-primary cancel"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-outline-danger delete"
              onClick={this.onDeleteClick.bind(this, question._id)}
            >
              Delete
            </button>
          </div>
        </Modal>
      </>
    );
  }
}
DeleteConfirm.propTypes = {
  deleteQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteQuestion })(DeleteConfirm);
