import React, { Component } from "react";
import CourseCard from "./courseCard";
//Layout
import Navbar from "../../layout/navbar";
import Footer from "../../layout/footer";

//ANTD
import { Skeleton } from "antd";

//Material-UI
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
//Dialog Form
import CourseFrom from "./courseForm";

//Redux
import { connect } from "react-redux";
import {
  getCourses,
  getCoursesByFilter,
} from "../../../redux/actions/courseActions";

//PropTypes
import { PropTypes } from "prop-types";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.filterByInput = this.filterByInput.bind(this);
    this.filterBySemester = this.filterBySemester.bind(this);
    this.state = {  value: "", search: "" };
    //console.log("initail"+this.state.value);
  }
  filterByInput(e) {
    this.setState({ value: e.target.value });
    //this.setState({ search: e.target.value });
    this.props.getCoursesByFilter((""),(e.target.value),(""),(""));
    //console.log(e.target.value)
    console.log(this.state.value)
  }
  filterBySemester(e) {
    this.setState({ search: e.target.value });
    //this.setState({ search: e.target.value });
    this.props.getCoursesByFilter((e.target.value),(""),(""),(""));
    console.log(this.state.search)
  }
  componentDidMount() {
    this.props.getCourses();
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
          {/* <div data-datacamp-exercise data-lang="python" data-height="500rem">
            <code data-type="pre-exercise-code">
              # This will get executed each time the exercise gets initialized b
              = 6
            </code>
            <code data-type="sample-code">
              # Create a variable a, equal to 5 # Print out a
            </code>
            <code data-type="solution"></code>
            <code data-type="sct">
              test_object("a") test_function("print") success_msg("Great job!")
            </code>

            <div data-type="hint">
              Use the assignment operator (<code>=</code>) to create the
              variable
              <code>a</code>.
            </div>
          </div>*/}
          <div className="page-content container">
            <div className="head-content ">
              <h1 className="course-h1">My Course</h1>
              <div className="flex">
                <Grid container spacing={10}>
                  <Grid item xs={12} lg={12} md={12} sm={12}>
                    <div className="components">
                      <CourseFrom />
                      <div className="search-field">
                        <div className="space-between-field">
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
                        <div className="space-between-field" >
                          <FormControl variant="outlined" size="small">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Semester
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={this.state.search}
                              onChange={this.filterBySemester}
                              label="Semester"
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
                              // value={age}
                              // onChange={handleChange}
                              label="Year"
                              style={{ width: 100 }}
                            >
                              <MenuItem value={""}>All</MenuItem>
                              <MenuItem value={"2021"}>2021</MenuItem>
                              <MenuItem value={"2022"}>2022</MenuItem>
                              <MenuItem value={"2023"}>2023</MenuItem>
                              <MenuItem value={"2024"}>2024</MenuItem>
                            </Select>
                          </FormControl>
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

HomePage.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, { getCourses, getCoursesByFilter })(
  HomePage
);
