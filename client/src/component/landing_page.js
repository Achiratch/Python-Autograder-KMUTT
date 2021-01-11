import React from "react";
import auth from "./auth";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const LandingPage = (props) => {
  const Button = styled.button`
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 8px;
  `;

  // A new component based on Button, but with some override styles
  const TomatoButton = styled(Button)`
    color: tomato;
    border-color: tomato;
  `;
  return (
    <div className="color-background ">
      <div className="image-background">
        <div className="dark-overlay landing-inner text-light ">
          <div className="container ">
            <div className="row">
              
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-12 python">Python Autograder</h1>

                <p className="lead"> Welcome to my web site</p>
                <Button  onClick={() => {
                        auth.login(() => {
                          props.history.push("/home");
                        });
                      }}>Normal Button</Button>
                <TomatoButton>Tomato Button</TomatoButton>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                >
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
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      Forgot password
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Link to="./register">Sign up </Link>
                    <a>if you don't have an account yet</a>
                  </Form.Item>
                  <Form.Item>
                    <button
                      type="button"
                      className="login-form-button"
                      
                      onClick={() => {
                        auth.login(() => {
                          props.history.push("/home");
                        });
                      }}
                    >
                      Login
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
