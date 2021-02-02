import React, { Component } from "react";
import styled from "styled-components";
import auth from "./auth";
import writing_image from "./images/writing.jpg";
import logo_python from "./images/logo_python.png";
import { Form, Input, Tooltip, Col } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Landing = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  margin: auto;
  background: conic-gradient(
    from 227.45deg at -8.46% 60.3%,
    #e2e2c0 -45deg,
    #0e4291 60.81deg,
    #e2e2c0 315deg,
    #0e4291 420.81deg
  );
`;
const Landing_Content = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo_Python = styled.div`
  background-image: url(${logo_python});
  background-size: cover;

  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20vh;
  height: 20vh;
  justify-content: center;
`;

const Welcome_Message = styled.h1`
  padding-block-start: 300px;
  padding-block-end: 300px;
  font-size: 85px;
  font-family: Roboto;
  font-weight: bold;
  color: rgb(255, 255, 255);
  text-align: center;
  background-color: rgba(57, 67, 92, 0.79);
  width: 100%;
  height: 100%;
`;

const Writing_Image = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${writing_image});
  background-repeat: no-repeat;
  width: calc(100% - 170px);
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
`;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 26,
    },
  },
};

const Holder_Form = styled.div`
  h2 {
    text-align: center;
  }
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
    };

    this.formRef = React.createRef();
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
  }
  componentDidMount() {
    //this.formRef.useForm();
  }
  async onFormSubmitHandler() {
    // Theese function will be exceuted if user passed the antd validation state
    console.log("[FORM]: Submitting the form");
    const _data = this.formRef.current.getFieldsValue();
    console.log(_data);
    auth.login(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <Landing>
        <Landing_Content>
          <Col xs={0} sm={0} md={0} lg={12}>
            <Writing_Image>
              <Welcome_Message>Python Autograder</Welcome_Message>
            </Writing_Image>
          </Col>
          <Col xs={24} sm={16} md={16} lg={8}>
            <Holder_Form>
              <Form
                onFinish={this.onFormSubmitHandler}
                {...formItemLayout}
                ref={this.formRef}
                name="register"
                scrollToFirstError
                size="large"
                className="register-form"
              >
                <Form.Item>
                  <Logo_Python />
                </Form.Item>
                <Form.Item>
                  <h2>Sign up your account</h2>
                </Form.Item>
                <Form.Item
                  name="studentID"
                  label={
                    <span>
                      Student ID&nbsp;
                      <Tooltip title="Your 11 digits student's ID number">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input your student ID!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || value.length === 11) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          `This is not a valid kmutt's student's ID!`
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input type="number" autoComplete="off" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="firstName"
                  label="First name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your firstname!",
                      whitespace: false,
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Last name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your lastname!",
                      whitespace: false,
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>

                <Form.Item>
                  <button
                    className="login-form-button"
                    className="btn btn-success btn-lg btn-block"
                    type="primary"
                    htmltype="submit"
                  >
                    Register
                  </button>
                </Form.Item>
              </Form>
            </Holder_Form>
          </Col>
        </Landing_Content>
      </Landing>
    );
  }
}

export default RegisterPage;
