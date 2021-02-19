import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Sidebar() {
  const [isActive, setActive] = useState(false);

  const activeClass = () => {
    setActive(!isActive);
  };
  return (
    <div className="sidebar">
      <div className="sidebar-head">
        <h1>CSS101</h1>
        <h2>Introduction coding Python</h2>
      </div>
      <div className="sidebar-link">
        <Link
          to="/exercises"
          className="menu-link active-sidebar"
          onClick={activeClass}
        >
          <span>
            <FontAwesomeIcon icon={faBook} size="lg" />
          </span>
          <span>Exercise</span>
        </Link>
        <Link
          to="scorebook"
          className="menu-link active-sidebar"
          onClick={activeClass}
        >
          <span>
            <FontAwesomeIcon icon={faStar} size="lg" />
          </span>
          <span>Score Book</span>
        </Link>
        <Link to="/member" className="menu-link active-sidebar" onClick={activeClass}>
          <span>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </span>
          <span>Member</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
