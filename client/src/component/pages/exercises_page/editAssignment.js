import React, { Component } from "react";
//ANTD
import { Form, Input, Select, message, DatePicker, InputNumber } from "antd";
import { Modal, Col, Transfer } from "antd";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUserPlus } from "@fortawesome/free-solid-svg-icons";

//Redux
import { editAssignment } from "../../../redux/actions/assignmentActions";
import { getQuestionsNoLimit } from "../../../redux/actions/collectionAction";
import { connect } from "react-redux";
class EditAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      errors: {},
      mockData: null,
      targetKeys: [],
      question: [],
    };
    this.scoreInput = this.scoreInput.bind(this);
    this.formRef = React.createRef();
    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
  }
  scoreInput(e) {
    this.setState({ score: e.target.value });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
      message.error(`${this.props.errors.error}`);
    }
    

    
  }
  componentDidMount(){
    this.props.getQuestionsNoLimit(this.props.assignment.course);
    let a = this.props.collection.questions;
    a.forEach((i) => {
      i.key = i._id;
    });
    this.setState({
      mockData: a,
    });
  }

  //Set chosen
  handleChange = (targetKeys) => {
    this.setState({ targetKeys: targetKeys });
  };

  //Search question
  filterOption = (inputValue, option) => option.name.indexOf(inputValue) > -1;
  handleSearch = (dir, value) => {};

  //Submit form
  onFormSubmitHandler() {
    console.log("[Edit assignment]");
    const data = this.formRef.current.getFieldsValue();
    const length = data.questions.length;

    for (let i = 0; i < length; i++) {
      this.setState((prevState) => ({
        question: [
          ...prevState.question,
          { _id: data.questions[i], score: data[i] },
        ],
      }));
    }
    const q = JSON.stringify(this.state.question);
    const a = {
      name: data.name,
      description: data.description,
      level: data.level,
      dueDate: data.dueDate._d,
      type: data.type,
      course: this.props.course.course._id,
      questions: q,
    };

    this.props.editAssignment(this.props.assignment._id,a);
    this.handleCancel();
    message.success("This assignment has been edited.");
  }

  /////////////////////////
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
    const { assignment } = this.props;
    return (
      <div>
        <button className="edit-exercises-button" onClick={this.showModal}>
          <span className="icon-button">
            <FontAwesomeIcon icon={faEdit} size="lg" />
          </span>
          Edit Assignment
        </button>
        <Modal
          centered
          visible={visible}
          width={1000}
          title="Edit Assignment"
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
                initialValue={assignment.name}
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
                initialValue={assignment.description}
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
                initialValue={assignment.type}
                rules={[
                  {
                    required: true,
                    message: "Please select Types!",
                    whitespace: false,
                  },
                ]}
              >
                <Select style={{ width: 250 }}>
                  <Option value="Exam">Exam</Option>
                  <Option value="Assignment">Assignment</Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="space"
                name="level"
                label="Level"
                initialValue={assignment.level}
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
                name="questions"
                label="Assignment"
                rules={[
                  {
                    required: true,
                    message: "Please choose assignment!",
                  },
                ]}
              >
                <Transfer
                  listStyle={{
                    width: 300,
                    height: 300,
                  }}
                  dataSource={this.state.mockData}
                  showSearch
                  titles={["Choices", "Chosen"]}
                  filterOption={this.filterOption}
                  targetKeys={this.state.targetKeys}
                  onChange={this.handleChange}
                  onSearch={this.handleSearch}
                  render={(item) => item.name}
                />
              </Form.Item>
              {this.state.targetKeys >= [1]
                ? this.state.targetKeys.map((name, arr) => (
                    <Form.Item
                      key={name}
                      className="space"
                      onChange={this.scoreInput}
                      //value={this.state.score}
                      name={`${arr}`}
                      label={`Score assignment ${arr + 1}`}
                      rules={[
                        {
                          required: true,
                          message: "Please input score!",
                        },
                      ]}
                    >
                      <InputNumber min={1} max={100} />
                    </Form.Item>
                  ))
                : null}
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
  course: state.course,
  collection: state.collection,
});

export default connect(mapStateToProps, {
  editAssignment,
  getQuestionsNoLimit,
})(EditAssignment);
