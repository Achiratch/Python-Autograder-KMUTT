import React, { Component } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./courseCard";
//Layout
import Navbar from "../../../layout/navbarStudent";
import Footer from "../../../layout/footer";

//ANTD
import { Skeleton } from "antd";

//Material-UI
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
//Dialog Form
import CourseFrom from "../../home_page/courseForm";

//Redux
import { connect } from "react-redux";
import { getStudentCourses } from "../../../../redux/actions/courseActions";

//PropTypes
import { PropTypes } from "prop-types";

class HomePageStudent extends Component {
  constructor(props) {
    super(props);
    this.filterByInput = this.filterByInput.bind(this);
    this.filterBySemester = this.filterBySemester.bind(this);
    this.filterByYear = this.filterByYear.bind(this);
    this.filter = this.filter.bind(this);
    this.state = { value: "", semester: "", year: "" };

    //console.log("initail"+this.state.value);
  }
  filterByInput(e) {
    this.setState({ value: e.target.value });
    //this.props.getCoursesByFilter(e.target.value, "", "");
    //console.log(e.target.value)
    console.log(this.state.value);
  }
  filterBySemester(e) {
    this.setState({ semester: e.target.value });
    //this.props.getCoursesByFilter("", e.target.value, "");
    console.log(this.state.semester);
  }
  filterByYear(e) {
    this.setState({ year: e.target.value });
    //this.props.getCoursesByFilter("", "", e.target.value);
    console.log(this.state.year);
  }
  filter() {
    this.props.getStudentCourses(
      this.props.auth.user.id,
      this.state.value,
      this.state.semester,
      this.state.year
    );
  }
  componentDidMount() {
    console.log(this.props.auth.user.id);
    this.props.getStudentCourses(this.props.auth.user.id, "", "", "");
  }
  render() {
    const { courses, loading } = this.props.course;

    let courseCard;
    if (courses === null || loading) {
      courseCard = <Skeleton active />;
    } else {
      courseCard = <CourseCard courses={courses} />;
    }
    return (
      <div>
        <Navbar />
        <div className="body">
          <div className="page-content container">
            <div className="head-content ">
              <h1 className="course-h1">All Course</h1>
              <h5 className="description">
                These courses are available to students.
              </h5>
              <div className="flex">
                <Grid container spacing={10}>
                  <Grid item xs={12} lg={12} md={12} sm={12}>
                    <div className="components">
                      <div className="search-field">
                        <div className="">
                          <FormControl
                            variant="outlined"
                            className="space-between-field"
                          >
                            <TextField
                              //value={this.state.value}
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
                        <div className="space-between-field">
                          <FormControl variant="outlined" size="small">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Semester
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              //value={this.state.search}
                              onChange={this.filterBySemester}
                              label="Semester"
                              value=""
                              style={{ width: 120 }}
                            >
                              <MenuItem value={""}>All</MenuItem>
                              <MenuItem value={"1"}>1</MenuItem>
                              <MenuItem value={"2"}>2</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="space-between-field">
                          <FormControl variant="outlined" size="small">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Year
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              //value={this.state.year}
                              onChange={this.filterByYear}
                              label="Year"
                              value=""
                              style={{ width: 100 }}
                            >
                              <MenuItem value={""}>All</MenuItem>
                              <MenuItem value={"2020"}>2020</MenuItem>
                              <MenuItem value={"2021"}>2021</MenuItem>
                              <MenuItem value={"2022"}>2022</MenuItem>
                              <MenuItem value={"2023"}>2023</MenuItem>
                              <MenuItem value={"2024"}>2024</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="space-between-field">
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            onClick={this.filter}
                          >
                            <SearchIcon fontSize="default" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="site-card-wrapper">
              <Grid container spacing={4}>
                {courseCard}
              </Grid>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  course: state.course,
  auth: state.auth,
});
export default connect(mapStateToProps, { getStudentCourses })(HomePageStudent);
