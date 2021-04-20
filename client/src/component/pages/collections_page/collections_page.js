import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../layout/navbar";
import Footer from "../../layout/footer";
import Sidebar from "../../layout/sidebar";

import styled from "styled-components";

class CollectionsPage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="body">
          <div className="page-content container">
            <div className="head-content ">
              <h1>Collection</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default CollectionsPage;
