import React, { Component } from "react";
import Sidebar from "../../../layout/sidebarStudent";
import Navbar from "../../../layout/navbarStudent";
import Footer from "../../../layout/footer";
import { Link } from "react-router-dom";

//ANTD
import { Breadcrumb } from "antd";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../../../redux/actions/courseActions";

//PropTypes
import { PropTypes } from "prop-types";

class ScoreBookPageStudent extends Component {
  render() {
    const { course } = this.props;
    return (
      <div>
        <Navbar />
        <div className="body">
          <Sidebar course={course} />
          <div className="page-content">
            <div className="head-content-member">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`/home/student`}>My Course</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {this.props.course.course.courseID}
                </Breadcrumb.Item>
                <Breadcrumb.Item>Score Book</Breadcrumb.Item>
              </Breadcrumb>
              <h1 id="title-name">Score Book</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ScoreBookPageStudent.propTypes = {
  getCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});
export default connect(mapStateToProps, { getCourse })(ScoreBookPageStudent);
