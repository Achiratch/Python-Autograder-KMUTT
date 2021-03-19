import React, { Component } from "react";

//CSS
import "./home_page.css";

//ANTD
import { Form, Input, Select, DatePicker, message } from "antd";
import { Modal, Col } from "antd";

//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Redux
import { connect } from "react-redux";
import { addCourse } from "../../../redux/actions/createCourseActions";

//PropTypes
import { PropTypes } from "prop-types";

//Style-Course-Card
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      errors: {},
    };

    this.formRef = React.createRef();
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
  }
  state = {
    visible: false,
  };
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
      message.error("This Course ID is already existed on this semester!");
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

  async onFormSubmitHandler() {
    console.log("[Create course]");
    const data = this.formRef.current.getFieldsValue();
    this.props.addCourse(data);
    this.handleCancel();
    message.success("This Course has been created.");
  }

  render() {
    const { Option } = Select;
    const { visible } = this.state;
    return (
      <div>
        <Card className={useStyles.root} onClick={this.showModal}>
          <CardActionArea>
            <CardContent>
              <h1 className="Typography">CREATE COURSE</h1>
              <Typography
                variant="body2"
                color="text"
                component="h2"
                className="Typography"
              ></Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Modal
          visible={visible}
          width={550}
          title="Create Course"
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
                Create
              </button>
            </Form>
          </Col>
        </Modal>
      </div>
    );
  }
}

CourseForm.propTypes = {
  addCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addCourse })(CourseForm);
