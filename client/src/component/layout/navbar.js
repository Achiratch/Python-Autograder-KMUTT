import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";


import logo_python from "../images/logo_python.png";
import styled from "styled-components";
import "./layout.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

import auth from "../auth/auth";

const Logo_Python = styled.div`
  background-image: url(${logo_python});
  background-size: cover;

  display: flex;
  width: 6vh;
  height: 6vh;
  justify-content: center;
`;

const Nav = styled.div`
  display: flex;
  z-index: 32;
  padding: 0 2 rem;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: rgba(39, 46, 65, 0.95);
`;

const Logo = styled.div`
  padding: 1rem 0;
  color: whitesmoke;
  display: flex;
  text-align: center;
  margin-left: 2rem;
`;
const Python = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 1rem;
  font-weight: 550;
  font-family: Roboto;
  cursor: context-menu;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 758px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
  }
`;

const Bell = styled.span`
  padding: 0rem 1.5rem;
  cursor: pointer;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  border-radius: 200px;
  &:hover {
    color: black;
    font-weight: 650;
    text-decoration: none;
  }
`;

const ChevonDown = styled.span`
  padding: 0rem 0.3rem;
  cursor: pointer;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  border-radius: 200px;
`;
const AccountName = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    color: white;
    font-weight: 500px;
    text-decoration: none;
  }
`;

const DropDown = styled.div`
  transition: 2s ease-in-out;
  z-index: 10;
`;

const DropDownLink = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 110%;
  width: 10rem;
  background-color: #272e41;
  padding: 0.5rem;
  padding-right: auto;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2), 0px 0px 10px rgb(0, 0, 0, 0.2);
  width: 10rem;
  li {
    color: whitesmoke;
    margin-left: 1rem;
    list-style-type: none;
    &:hover {
      color: grey;
      font-weight: 500px;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      z-index: 1;
    }
  }
`;

const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);
  //console.log(isActive) checkBool
  return [isActive, setIsActive];
};

function Navbar(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const { isAuthenticated, user } = props.auth;
  const onLogoutClick = () => props.logoutUser();

  return (
    <Nav>
      <Logo>
        <Logo_Python />
        <Python>Python Autograder</Python>
      </Logo>

      <Menu>
        <NavLink className="nav-link" to="/home">
          Class
        </NavLink>
        <NavLink className="nav-link" to="/collections">
          Collection
        </NavLink>
      </Menu>
      <Menu></Menu>
      <Menu></Menu>
      <Menu>
        <Bell>
          <FontAwesomeIcon icon={faBell} size="lg" color="white" />
        </Bell>

        <DropDown onClick={onClick}>
          <AccountName>{isAuthenticated ? user.studentID : null}</AccountName>
          <ChevonDown>
            <FontAwesomeIcon icon={faChevronDown} size="lg" color="white" />
          </ChevonDown>
          <DropDownLink
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <li>Edit Profile</li>
            <li>
              <Link to="/" className="drop-down-link" onClick={onLogoutClick}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                Logout
              </Link>
            </li>
          </DropDownLink>
        </DropDown>
      </Menu>
    </Nav>
  );
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
