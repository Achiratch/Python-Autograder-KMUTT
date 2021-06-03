import React, { Component } from "react";
import "../../collections_page/collections_page.css";
//Layout
import Navbar from "../../../layout/navbarStudent";
import Footer from "../../../layout/footer";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

//MATERIAL UI
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
//ANTD
import { Input } from "antd";
import LinearProgress from "@material-ui/core/LinearProgress";

//Redux
import { connect } from "react-redux";
import { getQuestion } from "../../../../redux/actions/collectionAction";

function loadScript(url) {
  // Adding the script tag to the head as suggested before
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  // Fire the loading
  head.appendChild(script);
}

// function ready() {
//   DCL.init();
//   DCL.instances["exercise"].on("feedback", (payload) => {
//     if (payload.correct) {
//       alert("You rock!");
//     } else {
//       alert("You fuck!");
//     }
//   });
// }

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

class CodePageStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      errors: {},
      code: {},
    };

    this.formRef = React.createRef();
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.getQuestion(this.props.match.params.id);
  }

  render() {
    const { TextArea } = Input;

    const { loading, question, sct, preExercise, sample, solution } =
      this.props.collection;
    let dataCamp;
    if (loading === true) {
      dataCamp = (
        <div className="page-content">
          <LinearProgress />
        </div>
      );
    } else if (loading === false) {
      loadScript("https://cdn.datacamp.com/dcl-react.js.gz");
      const asd = (DCL) => {
        DCL.init();
        DCL.instances["exercise"].on("feedback", (payload) => {
          console.log("mother fux")
          if (payload.correct === true) {
            alert("You rock!");
          } else {
            alert("You fuck!");
          }
        });
      };
      dataCamp = (
        <div className="page-content">
          <div className="header flex">
            <div className="name-header">
              <h1>Python Calculate</h1>
            </div>
            <div className="description-header">
              <span id="description">
                <b>Description</b>
              </span>
              <TextArea
                defaultValue="In the Python script on the right, you can type
        Python code to solve the exercises. If you hit Run Code or
        Submit Answer, your python script (script.py) is executed and
        the output is shown in the IPython Shell. Submit Answer checks
        whether your submission is correct and gives you feedback. You
        can hit Run Code and Submit Answer as often as you want. If
        you're stuck, you can click Get Hint, and ultimately Get
        Solution. You can also use the IPython Shell interactively by
        simply typing commands and hitting Enter. When you work in the
        shell directly, your code will not be checked for correctness
        so it is a great way to experiment."
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
          <div className="edit-code">
            <div
              data-datacamp-exercise
              data-show-run-button
              data-lang="python"
              data-height="550rem"
              id="exercise"
            >
              <code data-type="pre-exercise-code">{preExercise}</code>
              <code data-type="sample-code">{sample}</code>
              <code data-type="solution">{solution}</code>
              <code data-type="sct">{sct}</code>
              <div data-type="hint">
                Use the assignment operator (<code>=</code>) to create the
                variable
                <code>a</code>.
              </div>
            </div>
          </div>
          <div className="submit-button">
            {this.state.code === null ? (
              <ColorButton
                variant="contained"
                color="primary"
                startIcon={<DoneIcon />}
              >
                Submit Assignment
              </ColorButton>
            ) : (
              <ColorButton
                variant="contained"
                color="primary"
                disabled
                startIcon={<DoneIcon />}
              >
                Submit Assignment
              </ColorButton>
            )}
          </div>
        </div>
      );
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
  collection: state.collection,
});

export default connect(mapStateToProps, { getQuestion })(CodePageStudent);
