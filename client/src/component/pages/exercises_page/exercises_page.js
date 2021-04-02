import React, { Component } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";

//ANTD
import { Breadcrumb } from "antd";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../../redux/actions/courseActions";

//PropTypes
import { PropTypes } from "prop-types";

class ExercisesPage extends Component {
  componentDidMount() {
    this.props.getCourse(this.props.match.params.id);
  }
  render() {
    const { course } = this.props;
    return (
      <div>
        <Navbar />
        <div className="body">
          <Sidebar course={course} />
          <div className="page-content">
            <div className="head-content-member">
              <h1>Exercise</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/home">My Course</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.props.course.course.courseID}
                </Breadcrumb.Item>
                <Breadcrumb.Item>Exercise</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
ExercisesPage.propTypes = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { getCourse })(ExercisesPage);
