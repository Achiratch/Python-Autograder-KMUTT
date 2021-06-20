import React, { Component } from "react";
import "./collections_page.css";
//Layout
import Navbar from "../../layout/navbar";
import Footer from "../../layout/footer";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

//ANTD
import { Input } from "antd";

import LinearProgress from "@material-ui/core/LinearProgress";

//Redux
import { connect } from "react-redux";
import { getQuestion } from "../../../redux/actions/collectionAction";

function loadScript(url) {
  // Adding the script tag to the head as suggested before
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  // Fire the loading
  head.appendChild(script);
}

class QuestionPage extends Component {
  componentDidMount() {
    //loadScript("https://cdn.datacamp.com/dcl-react.js.gz");
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
          <div className="edit-code">
            <div data-datacamp-exercise data-show-run-button data-lang="python" data-height="550rem">
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

export default connect(mapStateToProps, { getQuestion })(QuestionPage);
