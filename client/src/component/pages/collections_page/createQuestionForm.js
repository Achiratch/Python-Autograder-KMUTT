import React, { Component } from "react";
import "./collections_page.css";
//ANTD
import { Form, Input, Select, message } from "antd";
import { Modal, Col } from "antd";
import { Upload } from "antd";

//Material-UI
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

//Redux
import { connect } from "react-redux";
import { addQuestion } from "../../../redux/actions/collectionAction";

class CreateQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      errors: {},
      sct: [],
      preExercise: [],
      sample: [],
      solution: [],
      level: {},
      description: {},
      name: {},
    };

    this.formRef = React.createRef();
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
      message.error(`${this.props.errors.error}`);
    }
  }
  onFormSubmitHandler() {
    console.log("[Create question]");
    const data = this.formRef.current.getFieldsValue();
    //solution 1
    let data_ = new FormData();
    data_.append("name", data.description);
    data_.append("description", data.description);
    data_.append("level", data.level);
    data_.append("preExercise", this.state.preExercise);
    data_.append("sample", this.state.sample);
    data_.append("sct", this.state.sct);
    data_.append("solution", this.state.solution);
    console.log(data_);
    //solution 2
    let formData = {
      name: data.name,
      description: data.description,
      level: data.level,
      preExercise: data.preExercise.file.originFileObj,
      sample: data.sample.file.originFileObj,
      sct: data.sct.file.originFileObj,
      solution: data.solution.file.originFileObj,
    };
    console.log(formData);

    // add one or more of your files in FormData
    // again, the original file is located at the `originFileObj` key
    //formData.append("name", data.name);
    //formData.append("courseDescription", this.state.fileList[0].originFileObj);
    //formData.append("level", this.state.fileList[0].originFileObj);
    //formData.append("preExercise", this.state.fileList[0].originFileObj);
    //formData.append("sample", this.state.fileList[0].originFileObj);
    //formData.append("sct", data.sct.file.originFileObj);
    //formData.append("solution", this.state.fileList[0].originFileObj);
    // delete data.sct.fileList;
    // delete data.preExercise.fileList;
    // delete data.sample.fileList;
    // delete data.solution.fileList;
    console.log(data);
    this.props.addQuestion(data_);
    this.handleCancel();
    message.success("This Question has been created.");
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
      multiple: "false",
      maxCount: "1",
      accept: ".txt, .py",
    };
    //
    return (
      <div>
        <Button
          onClick={this.showModal}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
        >
          Create Question
        </Button>
        <Modal
          visible={visible}
          width={550}
          title="Create Question"
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
                    required: true,
                    message: "Please upload file!",
                  },
                ]}
                hasFeedback
              >
                <Upload
                  {...props}
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
                    console.log(this.state.sct);
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
                    required: true,
                    message: "Please upload file!",
                  },
                ]}
                hasFeedback
              >
                <Upload
                  {...props}
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
                    required: true,
                    message: "Please upload file!",
                  },
                ]}
                hasFeedback
              >
                <Upload
                  {...props}
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
                    required: true,
                    message: "Please upload file!",
                  },
                ]}
                hasFeedback
              >
                <Upload
                  {...props}
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
                  Create
                </button>
              </div>
            </Form>
          </Col>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { addQuestion })(CreateQuestionForm);
