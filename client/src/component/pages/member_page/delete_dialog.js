import React, { Component } from "react";

//ANTD
import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

//Redux
import { connect } from "react-redux";
import { deleteStudent } from "../../../redux/actions/memberAction";

class DeletePopup extends Component {
  constructor(props){
    super(props)
    
    this.handleDelete= () => {
      if (this.props.selecter.length === 0) {
        message.error(`You didn't select a student yet.`);
      } else this.showModal()

    this.deleteSelecter = () => {
        this.props.deleteStudent(this.props.selecter.selecter);
        message.success(`This student has been remove`);
        this.handleCancel()
        //this.props.getAllStudents(props.course.course._id,"");
        //console.log("1")
        //console.log("2")
        // const d = props.member.students;
        // console.log(d)
        //   d.forEach((i) => {i.student.registerID = i._id})
        //   const f = d.map((data) => data.student)
    
        //   f.forEach((i) => (i.id = i._id));
        //   setData(f);
      };
    }
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
  
  

  render() {
    const { visible } = this.state;
    

    return (
      <div>
        <button onClick={this.handleDelete} className="delete-button">
          <span className="icon-button">
            <FontAwesomeIcon icon={faUserMinus} size="lg" />
          </span>
          Remove Students
        </button>
        <Modal
          centered
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
              Are you sure you want to remove this student ?
            </p>
          </div>
          <div className="course"></div>
          <div className="confirm-button">
            <button
              className="btn btn-outline-primary cancel"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
            <button onClick={this.deleteSelecter} className="btn btn-outline-danger delete">
              Remove Student
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  member: state.member,
});
export default connect(mapStateToProps,{ deleteStudent })(DeletePopup);
