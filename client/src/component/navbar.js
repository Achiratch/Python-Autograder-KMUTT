import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import logo_python from "./images/logo_python.png";
import styled from "styled-components";

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
  padding: 0 2 rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: rgba(39, 46, 65, 0.95); ;
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
  font-weight: 650;
  font-family: Roboto;
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
  text-decoration: none;
  color: whitesmoke;
  transition: all 0.2s ease-in;

  &:hover {
    color: gray;
    text-decoration: none;
  }
`;

class Navbar extends Component {
  render() {
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
      </Nav>
    );
  }
}

export default Navbar;
