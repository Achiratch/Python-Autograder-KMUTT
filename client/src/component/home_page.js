import React, { Component } from "react";
import auth from "./auth/auth";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";
class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div data-datacamp-exercise data-lang="python" data-height="500rem">
          <code data-type="pre-exercise-code">
            # This will get executed each time the exercise gets initialized b =
            6
          </code>
          <code data-type="sample-code">
            # Create a variable a, equal to 5 
            
            
            
            # Print out a
          </code>
          <code data-type="solution">
          </code>
          <code data-type="sct">
            test_object("a") test_function("print") success_msg("Great job!")
          </code>

          <div data-type="hint">
            Use the assignment operator (<code>=</code>) to create the variable
            <code>a</code>.
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
