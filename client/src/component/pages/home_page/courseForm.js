import React, { useState } from "react";

//CSS
import "./home_page.css";

//ANTD
import { Form, Input, Select, DatePicker } from "antd";
import { Modal, Col } from "antd";

//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Style-Course-Card
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CourseForm() {
  const { Option } = Select;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card className={useStyles.root} onClick={showModal}>
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
        width={650}
        title="Create Course"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Col xs={24} sm={16} md={24}>
          <Form
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
                  message: "Please input your firstname!",
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
              <DatePicker picker="year" />
            </Form.Item>
            <Form.Item>
              <button
                className="btn btn-success btn-lg button-create"
                type="primary"
                htmltype="submit"
              >
                Create
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Modal>
    </div>
  );
}
