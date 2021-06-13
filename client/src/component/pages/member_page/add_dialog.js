import React, { Component } from "react";
//ANTD
import { Modal } from "antd";

//Material-UI
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";

//Redux
import { connect } from "react-redux";
import {
  getAllStudents,
  addStudent,
  getStudents,
} from "../../../redux/actions/memberAction";

//Columns
import { columns } from "./member_page";

//PropTypes
import { PropTypes } from "prop-types";

class AddPopup extends Component {
  constructor(props) {
    super(props);
    this.filterByInput = this.filterByInput.bind(this);
    this.state = {
      user: [],
      selection: [],
      search: "",
    };
    this.sentStudent = () => {
      const student = JSON.stringify(this.state.selection);
      const studentData = {
        students: student,
        course: this.props.course.course._id,
      };
      this.props.addStudent(studentData);
      this.handleCancel();
      this.props.getAllStudents(this.props.course.course._id, "");
      const allStudent = this.props.member.allStudents;
      console.log(allStudent);
      allStudent.forEach((i) => (i.id = i._id));
      allStudent.map((data) => data.student);
      this.setState({ user: allStudent });
    };
  }

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

  componentDidMount() {
    this.props.getAllStudents(this.props.course.course._id, "");
    const allStudent = this.props.member.allStudents;
    allStudent.forEach((i) => (i.id = i._id));
    allStudent.map((data) => data.student);
    this.setState({ user: allStudent });
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.member.allStudents !== prevProps.member.allStudents) {
      const allStudent = this.props.member.allStudents;
      allStudent.forEach((i) => (i.id = i._id));
      allStudent.map((data) => data.student);
      this.setState({ user: allStudent });
    }
  }
  filterByInput(e) {
    this.setState({ search: e.target.value });
    console.log(e.target.value);
    this.props.getAllStudents(this.props.course.course._id, e.target.value);
  }

  render() {
    const { visible } = this.state;
    let table;
    if (this.state.user) {
      table = (
        <DataGrid
          autoPageSize={true}
          rows={this.state.user}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onSelectionModelChange={(item) =>
            this.setState(() => {
              return { selection: item.selectionModel };
            })
          }
        />
      );
    }
    return (
      <div>
        <button className="add-member-button" onClick={this.showModal}>
          <span className="icon-button">
            <FontAwesomeIcon icon={faUserPlus} size="lg" />
          </span>
          Add Student
        </button>
        <Modal
          visible={visible}
          width={1350}
          title="Add Student"
          onCancel={this.handleCancel}
          footer={null}
        >
          <TextField
            id="outlined-basic"
            size="small"
            label="Search"
            variant="outlined"
            onChange={this.filterByInput}
            style={{ margin: 10 }}
          />
          <div className="flex" style={{ height: 390, width: "100%" }}>{table}</div>
          <div className="group-button-add">
            <button
              onClick={this.handleCancel}
              className="btn btn-secondary btn-lg cancel-button"
            >
              Cancel
            </button>
            <button
              onClick={this.sentStudent}
              className="btn btn-success btn-lg add-student-button"
            >
              Add
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

AddPopup.propsTypes = {
  addStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  member: state.member,
});
export default connect(mapStateToProps, {
  getAllStudents,
  addStudent,
  getStudents,
})(AddPopup);
