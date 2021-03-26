import React, { Component } from "react";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../redux/actions/courseActions";

//PropTypes
import { PropTypes } from "prop-types";

class ScoreBookPage extends Component {
  render() {
    const { course } = this.props;
    return (
      <div>
        <Navbar />
        <div className="body">
          <Sidebar course={course} />
          <div>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
            <h1>Score Book</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ScoreBookPage.propTypes = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});
export default connect(mapStateToProps, { getCourse })(ScoreBookPage);
