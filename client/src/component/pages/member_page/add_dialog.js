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
import { getCourse } from "../../../redux/actions/courseActions";
import { getAllStudents } from "../../../redux/actions/memberAction";

//Columns
import { columns } from "./member_page";


class AddPopup extends Component {
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
  componentDidMount() {}
  render() {
    const { visible } = this.state;
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
            //value={q}
            //onChange={(e) => setQ(e.target.value)}
            style={{ margin: 10 }}
          />
          <div className="flex" style={{ height: 390, width: "100%" }}>
            <DataGrid
              rows={[]}
              columns={columns}
              pageSize={10}
              checkboxSelection
              onSelectionModelChange={(item) => console.log(item)}
            />
          </div>
          <div className="group-button-add">
            <button className="btn btn-secondary btn-lg cancel-button">Cancel</button>
            <button className="btn btn-success btn-lg add-student-button">Add</button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  course: state.course,
  member: state.allStudents,
});
export default connect(mapStateToProps, { getAllStudents })(AddPopup);
