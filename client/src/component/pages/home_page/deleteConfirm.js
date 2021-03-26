import React, { Component } from "react";
//ANTD
import { Modal, message } from "antd";
import { ExclamationCircleOutlined, DeleteFilled } from "@ant-design/icons";

//Material-UI
import Button from "@material-ui/core/Button";

//PropTypes
import { PropTypes } from "prop-types";

//Redux
import { connect } from "react-redux";
import { deleteCourse } from "../../../redux/actions/courseActions";

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
    this.props.deleteCourse(id);
    this.handleCancel();
    message.success(`Course ${this.props.course.courseID} has been deleted.`);
  }
  render() {
    const { course } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <div className="delete-button-trash">
          <Button  color="secondary" onClick={this.showModal}>
            <DeleteFilled className="trash" style={{ fontSize: "18px" }} />
            DELETE
          </Button>
        </div>

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
            <p className="text">Are you sure delete this course ?</p>
          </div>
          <div className="course">
            <p>{this.props.course.courseID}</p>
            <p className="course-name">: {this.props.course.courseName}</p>
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
              onClick={this.onDeleteClick.bind(this, course._id)}
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
DeleteConfirm.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteCourse })(DeleteConfirm);
