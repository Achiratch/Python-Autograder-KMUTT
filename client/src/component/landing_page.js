import React from "react";
import auth from "./auth";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Row, Col, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import coding_image from "./images/coding.jpg";
import logo_python from "./images/logo_python.png";
export const LandingPage = (props) => {
  const Coding_Image = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${coding_image});

    background-repeat: no-repeat;

    width: calc(100% - 170px);
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;
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
    font-size: 85px;
    font-family: Roboto;
    font-weight: bold;
    color: rgb(255, 255, 255);
    text-align: center;
  `;

  return (
    <div>
      <div class="landing">
        <div className="landing-content">
          <Col xs={0} sm={0} md={0} lg={12}>
            <Coding_Image>
              <Welcome_Message className="dark-overlay">
                Python Autograder
              </Welcome_Message>
            </Coding_Image>
          </Col>

          <Col xs={24} sm={16} md={16} lg={8}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
            >
              
              <Form.Item>
                <Logo_Python />
              </Form.Item>
              <Form.Item>
                <h2>Sign in your account</h2>
              </Form.Item>
              <Form.Item
                name="StudentID"
                rules={[
                  {
                    required: true,
                    message: "Please input your Student ID!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Student ID"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle  >
                  <Checkbox className="login-form-remember">Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Link to="./register">Sign up </Link>
                <a>if you don't have an account yet</a>
              </Form.Item>
              <Form.Item>
                <button
                  type="button"
                  className="login-form-button"
                  class="btn btn-success btn-lg btn-block"
                  onClick={() => {
                    auth.login(() => {
                      props.history.push("/home");
                    });
                  }}
                >
                  Sign in
                </button>
              </Form.Item>
            </Form>
          </Col>
        </div>
      </div>
    </div>
  );
};
