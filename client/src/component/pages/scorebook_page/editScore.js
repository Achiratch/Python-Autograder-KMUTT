import React, { Component } from "react";
import "../collections_page/collections_page.css";
import moment from "moment";
import ConfirmEditScore from "./confirmEditScore";
//Layout
import Navbar from "../../layout/navbar";
import Footer from "../../layout/footer";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

//MATERIAL UI
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import EditIcon from '@material-ui/icons/Edit';
//ANTD
import { Input } from "antd";
import LinearProgress from "@material-ui/core/LinearProgress";
import { InputNumber } from "antd";

//Redux
import { connect } from "react-redux";
import { getQuestionsInAssignment } from "../../../redux/actions/assignmentActions";
import { getAnswer } from "../../../redux/actions/statusActions";

function loadsScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

function onSubmit() {
  if (window.DCL !== undefined) {
    if (window.DCL.instances["question"] !== undefined) {
      window.DCL.instances["question"].on("submit", (action, payload) => {
      });
      window.DCL.instances["question"].on("feedback", (action, payload) => {
      });
    }
  }
}

class EditScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      errors: {},
      score: null,
    };
    this.scoreInput = this.scoreInput.bind(this);
    this.formRef = React.createRef();
  }
  scoreInput(e) {
    this.setState({ score: e });
  }
  componentDidMount() {
    this.props.getQuestionsInAssignment(
      this.props.match.params.assignmentId,
      this.props.match.params.questionId
    );
    this.props.getAnswer(this.props.match.params.scoreId);
  }
  render() {
    const { TextArea } = Input;
    const { question, loading, sct, preExercise, sample, solution } =
      this.props.assignment;
    const { statusQuestions, answer, code } = this.props.status;
    let dataCamp;
    if (loading === true) {
      dataCamp = (
        <div className="page-content">
          <LinearProgress />
        </div>
      );
    } else {
      if (answer || question) {
        if (answer.question === question._id) {
          const eventCode = function () {
            onSubmit();
          };
          loadsScript("https://cdn.datacamp.com/dcl-react.js.gz", eventCode);
          dataCamp = (
            <div className="page-content">
              <div className="header flex">
                <div className="name-header">
                  <h1>{question.name}</h1>
                </div>
                <div className="description-header">
                  <span id="description">
                    <b>Description</b>
                  </span>
                  <TextArea
                    defaultValue={`${question.description}`}
                    disabled={false}
                    autoSize={{ minRows: 3, maxRows: 4 }}
                    id="outputText"
                    cols="200"
                    bordered={false}
                    readOnly
                  ></TextArea>
                </div>
                <div
                  id={`background-level-${question.level}`}
                  className="level-header flex"
                >
                  <span>
                    <FontAwesomeIcon
                      className="fa-medal"
                      icon={faMedal}
                      color="white"
                    />
                  </span>
                  <h2>Level {question.level}</h2>
                </div>
              </div>
              <div className="score-edit">
                <div className="sent-date">
                  Sent on: {moment(answer.sentDate).format("LLL")}
                </div>
                <div className="edit">
                  Edit score:&nbsp;
                  <InputNumber
                    onChange={this.scoreInput}
                    size="large"
                    min={0}
                    max={question.score}
                    defaultValue={`${answer.score}`}
                  />
                </div>
                <div className="edit-score-button">
                  {this.state.score === null ? (
                    <ColorButton
                      variant="contained"
                      color="primary"
                      disabled
                      startIcon={<EditIcon />}
                    >
                      Edit Score
                    </ColorButton>
                  ) : (
                    <ConfirmEditScore question={question} scoreID={answer._id} newScore={this.state.score} />
                  )}
                </div>
              </div>
              <div className="edit-code">
                <div
                  data-datacamp-exercise
                  data-show-run-button
                  data-lang="python"
                  data-height="550rem"
                  id="question"
                  onClick={this.onSubmit}
                >
                  <code data-type="pre-exercise-code">{preExercise}</code>
                  <code data-type="sample-code">{code}</code>
                  <code data-type="solution">{solution}</code>
                  <code data-type="sct">{sct}</code>
                  <div data-type="hint">
                    Use the assignment operator (<code>=</code>) to create the
                    variable
                    <code>a</code>.
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    return (
      <div>
        <Navbar />
        <div className="body">{dataCamp}</div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assignment: state.assignment,
  course: state.course,
  status: state.status,
});
export default connect(mapStateToProps, {
  getQuestionsInAssignment,
  getAnswer,
})(EditScore);
