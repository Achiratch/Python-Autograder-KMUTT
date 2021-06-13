import React, { Component } from "react";
//ANTD
import { Form, Input, Select, message } from "antd";
import { Modal, Col } from "antd";

//Material-UI
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

//Redux
import { connect } from "react-redux";
import { editRole } from "../../../redux/actions/authActions";
class EditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      role: null,
    };
    this.formRef = React.createRef();
  }
  onSubmit() {
    const data = this.formRef.current.getFieldsValue();
    const dataRole = {
        user: this.props.user._id,
        role: data.role
    }
    console.log(dataRole)
    this.props.editRole(dataRole);
    this.handleCancel();
    message.success("This User has been edited.");
  }
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
    const { Option } = Select;
    const { visible } = this.state;
    const { TextArea } = Input;
    const { user } = this.props;
    return (
      <>
        <Tooltip title="Change">
          <IconButton aria-label="edit" size="medium" onClick={this.showModal}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Modal
          visible={visible}
          width={350}
          title="Edit Role"
          onCancel={this.handleCancel}
          footer={null}
        >
          <Col xs={24} sm={16} md={24}>
            <Form
              ref={this.formRef}
              onFinish={this.onSubmit.bind(this)}
              size="large"
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 14 }}
            >
              <Form.Item
                className="space"
                name="role"
                label="Role"
                initialValue={user.role}
                rules={[
                  {
                    required: true,
                    message: "Please select role!",
                    whitespace: false,
                  },
                ]}
              >
                <Select style={{ width: 100 }}>
                  <Option value="admin">admin</Option>
                  <Option value="student">student</Option>
                </Select>
              </Form.Item>
              <div className="create-question-button">
                <button
                  className="btn btn-success btn-lg "
                  type="primary"
                  htmltype="submit"
                >
                  Update
                </button>
              </div>
            </Form>
          </Col>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { editRole })(EditRole);
