import React, { Component } from "react";
import { Link } from "react-router-dom";

//ANTD
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


//Redux
import { deleteAssignment } from "../../../redux/actions/assignmentActions";
import { connect } from "react-redux";

class DeleteAssignment extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onDeleteClick(id) {
    this.props.deleteAssignment(id);
    this.handleCancel();
    message.success(
      `Assignment ${this.props.assignment.name} has been deleted.`
    );
  }

  render() {
    const { visible } = this.state;
    const { assignment } = this.props;
    return (
      <div>
        <button onClick={this.showModal} className="delete-exercises-button">
          <span className="icon-button">
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </span>
          Delete Assignment
        </button>
        <Modal
          centered
          width={650}
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
              Are you sure you want to delete this assignment ?
            </p>
          </div>
          <div className="course">
            <p>{assignment.name}</p>
            <p className="course-name">level {assignment.level}</p>
          </div>
          <div className="confirm-button">
            <button
              className="btn btn-outline-primary cancel"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <Link to={`/assignment/${assignment.course}`}>
              <button
                className="btn btn-outline-danger delete"
                onClick={this.onDeleteClick.bind(this, assignment._id)}
              >
                Delete
              </button>
            </Link>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteAssignment })(DeleteAssignment);
