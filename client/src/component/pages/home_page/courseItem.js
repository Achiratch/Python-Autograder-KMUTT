import React, { Component } from "react";

//ANTD
import { Col, Row } from "antd";

//Material-UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

//PropTypes
import { PropTypes } from "prop-types";

//Redux
import { connect } from "react-redux";

//Style-Course-Card
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class CourseItem extends Component {
  render() {
    const { course, auth } = this.props;
    return (
      <div>
        <Col span={8}>
          <Card className={useStyles.root}>
            <CardActionArea>
              <CardContent
                className="background-card"
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
      </div>
    );
  }
}

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CourseItem);
