import React, { Component } from "react";
import auth from "./auth";
import   Navbar  from "./navbar";
class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Content</h1>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            auth.logout(() => {
              this.props.history.push("/");
            });
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default HomePage;
