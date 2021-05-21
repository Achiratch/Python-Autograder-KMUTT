import React, { Component } from "react";
import "./collections_page.css";

//ANTD
import { Form, Input, Select, message } from "antd";
import { Modal, Col } from "antd";
import { Upload } from "antd";

//Material-UI
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

//Redux
import { connect } from "react-redux";
import { editQuestion } from "../../../redux/actions/collectionAction";

class QuestionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      errors: {},
      sct: null,
      preExercise: null,
      sample: null,
      solution: null,
      level: null,
      description: null,
      name: null,
    };
    this.formRef = React.createRef();
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(
      this,
      this.props.question._id
    );
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
      message.error(`${this.props.errors.error}`);
    }
  }
  onFormSubmitHandler(id) {
    console.log("[Create question]");
    const data = this.formRef.current.getFieldsValue();
    //solution 1
    let data_ = new FormData();
    data_.append("name", data.name);
    data_.append("description", data.description);
    data_.append("level", data.level);
    data_.append("preExercise", this.state.preExercise);
    data_.append("sample", this.state.sample);
    data_.append("sct", this.state.sct);
    data_.append("solution", this.state.solution);
    console.log(data_);
    this.props.editQuestion(id, data_);
    this.handleCancel();
    message.success("This Question has been edited.");
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
    //Upload file
    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },
      maxCount: "1",
      accept: ".txt, .py",
    };
    //
    return (
      <>
        <Tooltip title="Edit">
          <IconButton aria-label="edit" size="medium" onClick={this.showModal}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Modal
          visible={visible}
          width={550}
          title="Edit Question"
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
                name="name"
                label="Name"
                initialValue={this.props.question.name}
                rules={[
                  {
                    required: true,
                    message: "Please input your question name!",
                    whitespace: false,
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || value.length >= 6) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        `Name must be at least 6 characters!`
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
                name="description"
                label="Description"
                initialValue={this.props.question.description}
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
              >
                <TextArea rows="3" autoComplete="off" />
              </Form.Item>
              <Form.Item
                className="space"
                name="level"
                label="Level"
                initialValue={this.props.question.level}
                rules={[
                  {
                    required: true,
                    message: "Please select Level!",
                    whitespace: false,
                  },
                ]}
              >
                <Select style={{ width: 60 }}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="space"
                name="sct"
                label="File sct"
                rules={[
                  {
                    required: false,
                    message: "Please upload file!",
                  },
                ]}
                hasFeedback
              >
                <Upload
                  {...props}
                  defaultFileList={[
                    {
                      name: this.props.question.sct.filename,
                      status: "done",
                    },
                  ]}
                  onChange={(info) => {
                    if (info.file.status !== "uploading") {
                      console.log(info.file.originFileObj);
                    }
                    if (info.file.status === "done") {
                      message.success(
                        `${info.file.name} file uploaded successfully`
                      );
                    } else if (info.file.status === "error") {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                    this.setState({ sct: info.file.originFileObj });
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                className="space"
                name="preExercise"
                label="File preExercise"
                rules={[
                  {
                    required: false,
                    message: "Please upload file!",
                  },
                ]}
                hasFeedback
              >
                <Upload
                  {...props}
                  defaultFileList={[
                    {
                      name: this.props.question.preExercise.filename,
                      status: "done",
                    },
                  ]}
                  onChange={(info) => {
                    if (info.file.status !== "uploading") {
                      console.log(info.file.originFileObj);
                    }
                    if (info.file.status === "done") {
                      message.success(
                        `${info.file.name} file uploaded successfully`
                      );
                    } else if (info.file.status === "error") {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                    this.setState({ preExercise: info.file.originFileObj });
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                className="space"
                name="sample"
                label="File sample"
                rules={[
                  {
                    required: false,
                    message: "Please upload file!",
                  },
                ]}
                hasFeedback
              >
                <Upload
                  {...props}
                  defaultFileList={[
                    {
                      name: this.props.question.sample.filename,
                      status: "done",
                    },
                  ]}
                  onChange={(info) => {
                    if (info.file.status !== "uploading") {
                      console.log(info.file.originFileObj);
                    }
                    if (info.file.status === "done") {
                      message.success(
                        `${info.file.name} file uploaded successfully`
                      );
                    } else if (info.file.status === "error") {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                    this.setState({ sample: info.file.originFileObj });
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                className="space"
                name="solution"
                label="File solution"
                rules={[
                  {
                    required: false,
                    message: "Please upload file!",
                  },
                ]}
                hasFeedback
              >
                <Upload
                  {...props}
                  defaultFileList={[
                    {
                      name: this.props.question.solution.filename,
                      status: "done",
                    },
                  ]}
                  onChange={(info) => {
                    if (info.file.status !== "uploading") {
                      console.log(info.file.originFileObj);
                    }
                    if (info.file.status === "done") {
                      message.success(
                        `${info.file.name} file uploaded successfully`
                      );
                    } else if (info.file.status === "error") {
                      message.error(`${info.file.name} file upload failed.`);
                    }
                    this.setState({ solution: info.file.originFileObj });
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
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
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { editQuestion })(QuestionEdit);
