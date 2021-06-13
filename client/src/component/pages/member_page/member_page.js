import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
import AddPopup from "./add_dialog";
import DeletePopup from "./delete_dialog";
//CSS
import "../member_page/member_page.css";

//ANTD
import { Breadcrumb } from "antd";
import { message } from "antd";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

//Material-UI
import { LinearProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

//Redux
import { connect } from "react-redux";
import { getCourse } from "../../../redux/actions/courseActions";
import {
  getStudents,
  getAllStudents,
  deleteStudent,
} from "../../../redux/actions/memberAction";

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
    valueGetter: (params) => {
      return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
    },
  },
];

function MemberPage(props) {
  const [data, setData] = useState([]);
  const [selecter, setSelecter] = useState([]);
  const [search, setSearch] = useState("");

  //------Fetch Data---------------------------------------------
  useEffect(() => {
    if (props.member.student) {
      if (props.member.students !== null ) {
        const fetchMembers = () => {
          const a = props.member.students;
          a.forEach((i) => {
            i.student.registerID = i._id;
          });
          const c = a.map((data) => data.student);
          c.forEach((i) => (i.id = i._id));
          setData(c);
          console.log(c);
        };
        fetchMembers();
      }
    }
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

  let numberStudent;
  if (props.member.students) {
    if (props.member.students !== null) {
      numberStudent = props.member.students.length;
    } 
  }

  let studentTable;
  if (props.member.loading === true) {
    studentTable = <LinearProgress />;
  } else if (data.length !== 0) {
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

  // else if (props.errors.success === false ) {
  //   <div className="table-content">
  //     <div className="flex" style={{ height: 720, width: "100%" }}>
  //       <DataGrid
  //         rows={[]}
  //         columns={columns}
  //         pageSize={10}
  //         checkboxSelection
  //         Toolbar
  //         onSelectionModelChange={(item) => console.log(item)}
  //       />
  //     </div>
  //   </div>;
  // }

  return (
    <div>
      <Navbar />
      <div className="body">
        <Sidebar course={props.course} />
        <div className="page-content">
          <div className="head-content-member">
            <Breadcrumb>
              <Breadcrumb.Item href="/home">My Course</Breadcrumb.Item>
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
            {props.course.course.createdBy === props.auth.user.id ? (
              <div>
                <span className="button-member">
                  <DeletePopup selecter={selecter} />
                </span>
                <span className="button-member">
                  <AddPopup course={props.course} />
                </span>
              </div>
            ) : (
              <div className="block-invisible"></div>
            )}
            <div className="number-student">
              <h6 className="font-size-number">{numberStudent} Students</h6>
            </div>
          </div>
          {studentTable}
        </div>
      </div>
      <Footer />
    </div>
  );
}

MemberPage.propTypes = {
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
})(MemberPage);
