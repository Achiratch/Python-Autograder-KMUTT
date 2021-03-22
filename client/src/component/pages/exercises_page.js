import React, { Component } from "react";
import Footer from "../layout/footer";
import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";

//Redux
import { connect } from "react-redux";
import {
  getCourse,
} from "../../redux/actions/courseActions";

//PropTypes
import { PropTypes } from "prop-types";

class ExercisesPage extends Component {
  componentDidMount(){
    this.props.getCourse(this.props.match.params.id);
  }
  render() {
    const {course} = this.props;
    return (
      <div>
        <Navbar />
        <div className="body">
          <Sidebar course={course}/>
          <div>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
            <h1>Exercise page</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
ExercisesPage.propTypes ={
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { getCourse })(ExercisesPage);
