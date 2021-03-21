import React, { Component } from "react";
import auth from "../auth/auth";
import { Link } from "react-router-dom";
import { Form, Col, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import coding_image from "../images/coding.jpg";
import logo_python from "../images/logo_python.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
///Stlyed-------------------------------
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
  h2 {
    text-align: center;
  }
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
///-------------------------------

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
    };
    this.formRef = React.createRef();
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      auth.login(() => {
        this.props.history.push("/home");
      });
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      auth.login(() => {
        this.props.history.push("/home");
      });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  async onFormSubmitHandler() {
    console.log("[FORM]: Submitting the form");
    const _data = this.formRef.current.getFieldsValue();
    this.props.loginUser(_data, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Landing>
        <Landing_Content>
          <Col xs={0} sm={0} md={0} lg={12}>
            <Coding_Image>
              <Welcome_Message>Python Autograder</Welcome_Message>
            </Coding_Image>
          </Col>

          <Col xs={24} sm={16} md={16} lg={8}>
            <Form
              name="normal_login"
              className="login-form"
              size="large"
              onFinish={this.onFormSubmitHandler}
              ref={this.formRef}
              initialValues={{
                remember: false,
              }}
            >
              <Form.Item>
                <Logo_Python />
              </Form.Item>
              <Form.Item>
                <h2>Sign in your account</h2>
              </Form.Item>
              <Form.Item
                name="studentID"
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
                  <Checkbox className="login-form-remember">
                    Remember me
                  </Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item className="text">
                <Link to="./register">Sign up </Link>
                <a>if you don't have an account yet</a>
              </Form.Item>
              <Form.Item>
                <button
                  type="primary"
                  htmltype="submit"
                  className="login-form-button"
                  className="btn btn-success btn-lg btn-block"
                >
                  Sign in
                </button>
              </Form.Item>
            </Form>
          </Col>
        </Landing_Content>
      </Landing>
    );
  }
}

LandingPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(LandingPage);
