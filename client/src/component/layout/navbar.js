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
import bell from "../sound/bell.mp3"
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
  padding: 0 2rem;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: #010023;
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
  font-size: 18px;
  font-family: Roboto;
  text-decoration: none;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 18px;
  font-family: Roboto;
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
  margin-left: 0.5rem;
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
function Navbar(props) {
  const { isAuthenticated, user } = props.auth;
  const onLogoutClick = () => props.logoutUser();
  let audio = new Audio(bell)

  const start = () => {
    audio.play()
  }
  return (
    <Nav>
      <NavLink className="logo-link" to="/home">
        <Logo>
          <Logo_Python />
          <Python>Python Autograder</Python>
        </Logo>
      </NavLink>

      <Menu>
        <NavLink className="nav-link" to="/home">
          Class
        </NavLink>
        <NavLink className="nav-link" to="/collections">
          Collection
        </NavLink>
        <NavLink className="nav-link" to="/role">
          Role Management
        </NavLink>
      </Menu>
      <Menu></Menu>
      <Menu></Menu>
      <Menu>
        <Bell onClick={start}>
          <FontAwesomeIcon icon={faBell} size="lg" color="white" />
        </Bell>

        <div className="Drop-Down">
          <AccountName>{isAuthenticated ? user.studentID : null}</AccountName>
          <ChevonDown>
            <FontAwesomeIcon icon={faChevronDown} size="lg" color="white" />
          </ChevonDown>
          <div className="Drop-Down-Link">
            <li>
              <Link to="/" className="drop-down-link" onClick={onLogoutClick}>
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                Logout
              </Link>
            </li>
          </div>
        </div>
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
