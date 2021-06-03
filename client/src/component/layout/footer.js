import React from "react";
import styled from "styled-components";
import logoDatacamp from "../images/datacamp.png";
import "./layout.css";

const Logo_Python = styled.div`
  background-image: url(${logoDatacamp});
  background-size: cover;
  display: flex;
  width: 12vh;
  height: 6vh;
  border-radius: 5px;
  justify-content: center;
  margin-left: 3rem;
  background-position:0px ;
`;

const Foot = styled.div`
  display: flex;
  justify-content: center;
  color: whitesmoke;
  background: #010023;
  text-align: center;
  padding: 2rem;
  font-family: Roboto;
  bottom: 0;
  text-align: center;
  flex-flow: row wrap;
`;
function Footer() {
  return (
    <Foot >
    <h1 className="footer">Copyright &copy; {new Date().getFullYear()} Python Autograder</h1>
    <Logo_Python></Logo_Python>
    </Foot>
  );
}

export default Footer;
