import React, { Component } from "react";

//ANTD
import { Form, Input, Select, message, DatePicker } from "antd";
import { Modal, Col } from "antd";

import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

//Material-UI
import AddBoxIcon from "@material-ui/icons/AddBox";

//Redux
import { connect } from "react-redux";

class AddExercise extends Component {
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
    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div>
        <button onClick={this.showModal} className="add-exercises-button">
          <span className="icon-button">
            <AddBoxIcon />
          </span>
          Add Assignment
        </button>
        <Modal
          visible={visible}
          width={600}
          title="Add Exercise"
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
                label="Assignment Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Assignment Name!",
                    whitespace: false,
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || value.length >= 6) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        `Assignment Name must be at least 6 characters!`
                      );
                    },
                  }),
                ]}
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
                name="dueDate"
                label="Due Date"
                rules={[
                  {
                    type: "object",
                    required: true,
                    message: "Please select time!",
                  },
                ]}
              >
                <DatePicker style={{ width: 250 }} showTime />
              </Form.Item>
              <Form.Item
                className="space"
                name="type"
                label="Types"
                rules={[
                  {
                    required: true,
                    message: "Please select Types!",
                    whitespace: false,
                  },
                ]}
              >
                <Select style={{ width: 250 }}>
                  <Option value="exam">Exam</Option>
                  <Option value="assignment">Assignment</Option>
                </Select>
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
                name="file"
                label="File"
                rules={[
                  {
                    required: true,
                    message: "Please upload file!",
                  },
                ]}
              >
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Col>
        </Modal>
      </div>
    );
  }
}
export default AddExercise;
