import React, { Component } from "react";
import auth from "./auth/auth";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";

class HomePage extends Component {
  
  render() {
    return (
      <div>
        <Navbar />
        <h1>Content</h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            auth.logout(() => {
              this.props.history.push("/");
            });
          }}
        >
          Logout
        </button>
        <Footer />
      </div>
    );
  }
}

export default HomePage;
