import React, { Component } from "react";
import UserBox from "./userBox";
//Layout
import Navbar from "../../layout/navbar";

//Material-UI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";

import Footer from "../../layout/footer";
//Redux
import { connect } from "react-redux";
import { getUsers, editRole } from "../../../redux/actions/authActions";

//ANTD
import { Skeleton } from "antd";

class RoleManagement extends Component {
  constructor(props) {
    super(props);
    this.filterByInput = this.filterByInput.bind(this);
    this.filter = this.filter.bind(this);
    this.state = { value: "" };
  }
  filterByInput(e) {
    this.setState({ value: e.target.value });
  }
  filter() {
    this.props.getUsers(this.state.value);
  }
  componentDidMount() {
    this.props.getUsers("");
  }
  render() {
    const { users, loading } = this.props.auth;
    let userBox;
    if (loading === true) {
      userBox = <Skeleton />;
    } else {
      userBox = <UserBox users={users} />;
    }
    return (
      <div>
        <Navbar />
        <div className="body">
          <div className="page-content container">
            <div className="head-content ">
              <h1>Role Management</h1>
              <div className="flex">
                <Grid container spacing={10}>
                  <Grid item xs={12} lg={12} md={12} sm={12}>
                    <div className="search-role">
                      <div className="search-role">
                        <div className="search-user">
                          <FormControl
                            variant="outlined"
                            className="space-between-field"
                          >
                            <TextField
                              value={this.state.value}
                              onChange={this.filterByInput}
                              autoComplete="off"
                              size="small"
                              id="outlined-basic"
                              label="Search"
                              variant="outlined"
                              style={{ margin: 0 }}
                            />
                          </FormControl>
                        </div>
                        <div className="search-button">
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={this.filter}
                          >
                            <SearchIcon fontSize="medium" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            {userBox}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers, editRole })(RoleManagement);
