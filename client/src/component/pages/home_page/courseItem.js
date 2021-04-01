import React, { Component } from "react";
import DeleteConfirm from "./deleteConfirm";
import CourseEdit from "./courseEdit";

//Material-UI
import { Grid } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
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
import { Link } from "react-router-dom";

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
        <Card className={useStyles.root}>
          <Link className="hover" to={`/exercises/${course._id}`}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://images.unsplash.com/photo-1597589827307-d393da1520d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=694&q=80"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.course.courseID}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.course.courseName}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions>
            <Button size="small" color="primary">
              Semeseter {this.props.course.semester} /{" "}
              {this.props.course.academicYear}
            </Button>

            {course.createdBy._id === auth.user.id ||
            course.createdBy === auth.user.id ? (
              <Grid item xs={4} lg={4} md={6} sm={12}>
                <div className="flex">
                  <CourseEdit course={course} />
                  <DeleteConfirm course={course} />
                </div>
              </Grid>
            ) : null}
          </CardActions>
        </Card>
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
