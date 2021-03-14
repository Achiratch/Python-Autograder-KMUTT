import React, { Component, useState } from "react";
//Layout
import Navbar from "../../layout/navbar";
import Footer from "../../layout/footer";

//ANTD
import { Col, Row, message } from "antd";

//Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//Dialog Form
import CourseFrom from "./courseForm";

//Redux
import { connect } from "react-redux";
import { createCourse } from "../../../redux/actions/createCourseActions";

//PropTypes
import { PropTypes } from "prop-types";

//Style-Course-Card
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_requesting: false,
      errors: {},
    };
  }

  render() {
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
              <h1>My Course</h1>
            </div>
            <div className="site-card-wrapper">
              <Row gutter={16} className="space-card">
                <Col span={8}>
                  <CourseFrom />
                </Col>

                <Col span={8}>
                  <Card className={useStyles.root}>
                    <CardActionArea>
                      <CardContent
                        className="background-card"
                        onClick={() => {
                          this.props.history.push("/exercises");
                        }}
                      >
                        <h1 className="Typography">CSS101</h1>
                        <Typography
                          variant="body2"
                          color="text"
                          component="h2"
                          className="Typography"
                        >
                          Introduction coding Python
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className={useStyles.root}>
                    <CardActionArea>
                      <CardContent className="background-card">
                        <h1 className="Typography">CSS101</h1>
                        <Typography
                          variant="body2"
                          color="text"
                          component="h2"
                          className="Typography"
                        >
                          Introduction coding Python
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  createCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createCourse })(HomePage);
