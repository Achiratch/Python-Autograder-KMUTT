import React, { Component } from "react";
import { Link } from "react-router-dom";
import QuestionBox from "./questionBox";
//Layout
import Navbar from "../../layout/navbar";
import Footer from "../../layout/footer";
import Sidebar from "../../layout/sidebar";
import CreateQuestionForm from "./createQuestionForm";

//Material-UI
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

//ANTD
import { Skeleton } from "antd";

//Redux
import { connect } from "react-redux";
import { getQuestions } from "../../../redux/actions/collectionAction";

class CollectionsPage extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }
  render() {
    const { questions, loading } = this.props.collection;
    let questionBox;
    if (questions === null || loading) {
      questionBox = <Skeleton active />;
    } else {
      questionBox = <QuestionBox questions={questions} />;
    }
    return (
      <div>
        <Navbar />
        <div className="body">
          <div className="page-content container">
            <div className="head-content ">
              <h1>Collection</h1>
              <div className="flex">
                <Grid container spacing={10}>
                  <Grid item xs={12} lg={12} md={12} sm={12}>
                    <div className="components">
                      <CreateQuestionForm />
                      <div className="search-field">
                        <div className="space-between-field">
                          <FormControl
                            variant="outlined"
                            className="space-between-field"
                          >
                            <TextField
                              //value={this.state.value}
                              //onChange={this.filterByInput}
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
                              Level
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              //value={this.state.search}
                              onChange={this.filterBySemester}
                              label="Level"
                              style={{ width: 100 }}
                            >
                              <MenuItem value={""}>All</MenuItem>
                              <MenuItem value={"1"}>1</MenuItem>
                              <MenuItem value={"2"}>2</MenuItem>
                              <MenuItem value={"3"}>3</MenuItem>
                              <MenuItem value={"4"}>4</MenuItem>
                              <MenuItem value={"5"}>5</MenuItem>
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
                            <SearchIcon fontSize="medium" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              {questionBox}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collection: state.collection,
});
export default connect(mapStateToProps, { getQuestions })(CollectionsPage);
