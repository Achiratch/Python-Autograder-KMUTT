import React, { useState, useEffect } from "react";
import Footer from "../../../layout/footer";
import Navbar from "../../../layout/navbarStudent";
import Sidebar from "../../../layout/sidebarStudent";
import { Link } from "react-router-dom";

//CSS
import "../../member_page/member_page.css";

//ANTD
import { Breadcrumb } from "antd";

//Material-UI
import { LinearProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../../../redux/actions/courseActions";
import {
  getStudents,
  getAllStudents,
  deleteStudent,
} from "../../../../redux/actions/memberAction";

//PropTypes
import { PropTypes } from "prop-types";

export const columns = [
  { field: "studentID", headerName: "ID", width: 200, sortable: false },
  { field: "firstName", headerName: "First name", width: 200, sortable: false },
  { field: "lastName", headerName: "Last name", width: 200, sortable: false },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 300,
    sortable: false,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
];

function MemberPageStudent(props) {
  const [data, setData] = useState([]);
  const [selecter, setSelecter] = useState([]);
  const [search, setSearch] = useState("");

  //------Fetch Data---------------------------------------------
  useEffect(() => {
    const fetchMembers = () => {
      const a = props.member.students;
      a.forEach((i) => {
        i.student.registerID = i._id;
      });
      const c = a.map((data) => data.student);
      c.forEach((i) => (i.id = i._id));
      setData(c);
    };
    fetchMembers();
  }, [props.member.students]);
  //---------------------------------------------------------------

  //------Search---------------------------------------------------
  const filterByInput = (e) => {
    setSearch({ search: e.target.value });
    console.log(e.target.value);
    props.getStudents(props.course.course._id, e.target.value);
    props.getAllStudents(props.course.course._id, "");
  };
  //---------------------------------------------------------------

  let studentTable;
  if (props.member.loading === true) {
    studentTable = <LinearProgress />;
  } else if (data.length !== 0) {
    console.log(data)
    studentTable = (
      <div className="table-content">
        <div className="flex" style={{ height: 720, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            onRowSelected={(item) =>
              setSelecter({ selecter: item.data.registerID })
            }
          />
        </div>
      </div>
    );
  } 

  return (
    <div>
      <Navbar />
      <div className="body">
        <Sidebar course={props.course} />
        <div className="page-content">
          <div className="head-content-member">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={`/home/student`}>My Course</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{props.course.course.courseID}</Breadcrumb.Item>
              <Breadcrumb.Item>Member</Breadcrumb.Item>
            </Breadcrumb>
            <h1 id="title-name">Member</h1>
          </div>
          <div className="flex">
            <div className="search-member">
              <FormControl variant="outlined">
                <TextField
                  onChange={filterByInput}
                  autoComplete="off"
                  size="small"
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  style={{ width: 250 }}
                />
              </FormControl>
            </div>
            <div className="block-invisible"></div>
            <div className="number-student">
              <h6 className="font-size-number">
                {props.member.students.length} Students
              </h6>
            </div>
          </div>
          {studentTable}
        </div>
      </div>
      <Footer />
    </div>
  );
}

MemberPageStudent.propTypes = {
  getCourse: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    course: state.course,
    member: state.member,
    errors: state.errors,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {
  getCourse,
  getStudents,
  deleteStudent,
  getAllStudents,
})(MemberPageStudent);
