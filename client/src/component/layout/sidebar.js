import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-head">
        <h1>CSS101</h1>
        <h2>Introduction coding Python</h2>
      </div>
      <div className="sidebar-link">
        <NavLink
          exact
          to="/exercises"
          activeClassName="active-sidebar"
          className="menu-link "
        >
          <span>
            <FontAwesomeIcon icon={faBook} size="lg" />
          </span>
          <span>Exercise</span>
        </NavLink>
        <NavLink
          exact
          to="scorebook"
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
          to="/member"
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

export default Sidebar;
