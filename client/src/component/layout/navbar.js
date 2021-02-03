import React, { Component, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import logo_python from "./images/logo_python.png";
import styled from "styled-components";

import auth from "../auth";

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

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  font-weight: 550;
  font-family: Roboto;
  text-decoration: none;
  color: whitesmoke;
  transition: all 0.2s ease-in-out;
  border-radius: 50px;

  &:hover {
    color: black;
    font-weight: 650;
    text-decoration: none;
    border-radius: 15px;
    background-color: #f2f2f2;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2), 0px 0px 20px rgb(0, 0, 0, 0.2);
    z-index: 1;
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

  return [isActive, setIsActive];
};

 function Navbar() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  return (
    <Nav>
      <Logo>
        <Logo_Python />
        <Python>Python Autograder</Python>
      </Logo>

      <Menu>
        <MenuLink>Class</MenuLink>
        <MenuLink>Collection</MenuLink>
      </Menu>
      <Menu></Menu>
      <Menu></Menu>
      <Menu>
        <Bell>
          <FontAwesomeIcon icon={faBell} size="lg" color="white" />
        </Bell>

        <DropDown onClick={onClick}>
          <AccountName>Achiratch</AccountName>
          <ChevonDown>
            <FontAwesomeIcon icon={faChevronDown} size="lg" color="white" />
          </ChevonDown>
          <DropDownLink
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <li>
              <a>Edit Profile</a>
            </li>
            <li>
              <Link type="button" to="/" className="btn btn-danger">
                <FontAwesomeIcon icon={faSignOutAlt} size="sm" color="white" />
                Logout
              </Link>
            </li>
          </DropDownLink>
        </DropDown>
      </Menu>
    </Nav>
  );
}
export default Navbar;