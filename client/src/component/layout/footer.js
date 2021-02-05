import React from "react";
import styled from "styled-components";

const Foot = styled.div`
  display: static;
  color: whitesmoke;
  background: rgba(39, 46, 65, 0.95);
  text-align: center;
  padding: 3rem;
  font-family: Roboto;
`;
function Footer() {
  return (
    <Foot className="">
      Copyright &copy; {new Date().getFullYear()} Python Autograder
    </Foot>
  );
}

export default Footer;
