import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

//PropTypes
import { PropTypes } from "prop-types";

function Sidebar(props) {
  const { course } = props.course;
  return (
    <div className="sidebar">
      <div className="sidebar-head">
        <h1>{course.courseID}</h1>
        <h2>{course.courseName}</h2>
      </div>
      <div className="sidebar-link">
        <NavLink
          exact
          to={`/assignment/${course._id}/student`}
          activeClassName="active-sidebar"
          className="menu-link "
        >
          <span>
            <FontAwesomeIcon icon={faBook} size="lg" />
          </span>
          <span>Assignment</span>
        </NavLink>
        <NavLink
          exact
          to={`/scorebook/${course._id}/student`}
          className="menu-link"
          activeClassName="active-sidebar"
        >
          <span>
            <FontAwesomeIcon icon={faStar} size="lg" />
          </span>
          <span>Score Book</span>
        </NavLink>
        <NavLink
          exact
          to={`/member/${course._id}/student`}
          className="menu-link "
          activeClassName="active-sidebar"
        >
          <span>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </span>
          <span>Member</span>
        </NavLink>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  course: PropTypes.object.isRequired,
};

export default Sidebar;
