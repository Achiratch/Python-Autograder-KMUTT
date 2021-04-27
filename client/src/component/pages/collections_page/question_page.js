import React, { Component } from "react";
//Layout
import Navbar from "../../layout/navbar";
import Footer from "../../layout/footer";

//Redux
import { connect } from "react-redux";
import { getQuestion } from "../../../redux/actions/collectionAction";
class QuestionPage extends Component {
    componentDidMount(){
        console.log(this.props.match.params.id)
        this.props.getQuestion(this.props.match.params.id)
    }
  render() {
    return (
      <div>
        <Navbar />
        <div className="body">
          <div className="page-content">
            <div data-datacamp-exercise data-lang="python" data-height="500rem">
              <code data-type="pre-exercise-code">
                # This will get executed each time the exercise gets initialized
                b = 6
              </code>
              <code data-type="sample-code">
                # Create a variable a, equal to 5 # Print out a
              </code>
              <code data-type="solution"></code>
              <code data-type="sct">
                test_object("a") test_function("print") success_msg("Great
                job!")
              </code>

              <div data-type="hint">
                Use the assignment operator (<code>=</code>) to create the
                variable
                <code>a</code>.
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
    collection: state.collection,
  });

export default connect(mapStateToProps,{getQuestion})(QuestionPage);
