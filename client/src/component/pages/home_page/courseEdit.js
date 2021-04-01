import React, { Component } from "react";

//ANTD
import { Modal, message, Col, Form, Input, Select } from "antd";

//Material-UI
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';

//PropTypes
import { PropTypes } from "prop-types";

//Redux
import { connect } from "react-redux";
import { editCourse } from "../../../redux/actions/courseActions";

class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      errors: {},
    };
    const { course } = this.props;
    this.formRef = React.createRef();
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this, course._id);
  }
  state = { visible: false };
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
      message.error(`${this.props.errors.error}`);
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  async onFormSubmitHandler(id) {
    console.log("[Edit course]");
    const data = this.formRef.current.getFieldsValue();
    console.log(data);
    console.log(id);
    this.props.editCourse(id, data);
    this.handleCancel();
    message.success("This Course has been edited.");
  }

  render() {
    const { Option } = Select;
    const { course } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <div className="edit-button">
          <IconButton size="small" onClick={this.showModal}>
            <EditIcon style={{ fontSize: "20px" }} />
          </IconButton>
        </div>
        <Modal
          visible={visible}
          width={550}
          title="Edit Course"
          onCancel={this.handleCancel}
          footer={null}
        >
          <Col xs={24} sm={16} md={24}>
            <Form
              ref={this.formRef}
              onFinish={this.onFormSubmitHandler}
              size="large"
              labelCol={{ span: 6, offset: 0 }}
              wrapperCol={{ span: 14 }}
            >
              <Form.Item
                className="space"
                name="courseID"
                label="Course ID"
                initialValue={this.props.course.courseID}
                rules={[
                  {
                    required: true,
                    message: "Please input your Course ID!",
                    whitespace: false,
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || value.length === 6) {
                        return Promise.resolve();
                      }
                      return Promise.reject(`Course ID must be 6 characters!`);
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                className="space"
                name="courseName"
                label="Course Name"
                initialValue={this.props.course.courseName}
                rules={[
                  {
                    required: true,
                    message: "Please input your Course Name!",
                    whitespace: false,
                  },
                ]}
                hasFeedback
              >
                <Input autoComplete="off" />
              </Form.Item>

              <Form.Item
                className="space"
                name="courseDescription"
                label="Description"
                initialValue={this.props.course.courseDescription}
                rules={[
                  {
                    required: true,
                    message: "Please input your Description!",
                    whitespace: false,
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || value.length >= 6) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        `Description must be at least 6 characters!`
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input autoComplete="off" />
              </Form.Item>

              <Form.Item
                className="space"
                name="semester"
                label="Semester"
                initialValue={this.props.course.semester}
                rules={[
                  {
                    required: true,
                    message: "Please input your Semester!",
                    whitespace: false,
                  },
                ]}
              >
                <Select style={{ width: 200 }}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="space"
                name="academicYear"
                label="Academic Year"
                initialValue={this.props.course.academicYear}
                rules={[
                  {
                    required: true,
                    message: "Please input your Academic Year!",
                  },
                ]}
              >
                <Select style={{ width: 200 }}>
                  <Option value="2020">2020</Option>
                  <Option value="2021">2021</Option>
                  <Option value="2022">2022</Option>
                  <Option value="2023">2023</Option>
                  <Option value="2024">2024</Option>
                  <Option value="2025">2025</Option>
                  <Option value="2026">2026</Option>
                </Select>
              </Form.Item>
              <Form.Item></Form.Item>
              <button
                className="btn btn-success btn-lg button-create"
                type="primary"
                htmltype="submit"
              >
                Update
              </button>
            </Form>
          </Col>
        </Modal>
      </div>
    );
  }
}

CourseEdit.propTypes = {
  editCourse: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { editCourse })(CourseEdit);
