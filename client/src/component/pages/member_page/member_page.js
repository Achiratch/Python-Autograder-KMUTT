import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
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
import AddPopup from "./add_dialog";
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
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
];

function MemberPage(props) {
  const [data, setData] = useState([]);
  const [selecter, setSelecter] = useState([]);
  const [q, setQ] = useState("");
  const deleteSelector = () => {
    props.deleteStudent(selecter.selecter);
    //props.getAllStudents(props.course.course._id);
    //console.log("1")
    //console.log("2")
    // const d = props.member.students;
    // console.log(d)
    //   d.forEach((i) => {i.student.registerID = i._id})
    //   const f = d.map((data) => data.student)

    //   f.forEach((i) => (i.id = i._id));
    //   setData(f);
  };
  console.log(selecter.selecter)

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
      console.log(c);
    };
    fetchMembers();
    console.log("useEffect");
  }, [props.member.students]);
  //---------------------------------------------------------------

  //------Search---------------------------------------------------
  // function search(rows) {
  //   return rows.filter(
  //     (row) =>
  //       row.studentID.toLowerCase().indexOf(q) > -1 ||
  //       row.firstName.toLowerCase().indexOf(q) > -1 ||
  //       row.lastName.toLowerCase().indexOf(q) > -1 ||
  //       row.email.toLowerCase().indexOf(q) > -1
  //   );
  // }
  //---------------------------------------------------------------
  //const number_student = data.length;
  //console.log(data);
  let studentTable;
  if (props.member.loading === true) {
    studentTable = <LinearProgress />;
  } else
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
            <h1>Member</h1>
            <Breadcrumb>
              <Breadcrumb.Item href="/home">My Course</Breadcrumb.Item>
              <Breadcrumb.Item>{props.course.course.courseID}</Breadcrumb.Item>
              <Breadcrumb.Item>Member</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="flex">
            <div className="search-member">
              <FormControl variant="outlined">
                <TextField
                  //value={this.state.value}
                  //onChange={this.filterByInput}
                  autoComplete="off"
                  size="small"
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  style={{ width: 250 }}
                />
              </FormControl>
            </div>
            <span className="button-member">
              <AddPopup course={props.course} />
            </span>
            <span className="button-member">
              <button onClick={deleteSelector} className="delete-button">
                <span className="icon-button">
                  <FontAwesomeIcon icon={faUserMinus} size="lg" />
                </span>
                Remove Students
              </button>
            </span>
            <span className="number-student">
              <span>
                <h6 className="font-size-number">
                  {props.member.students.length} Students
                </h6>
              </span>
            </span>
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
  return { course: state.course, member: state.member, errors: state.errors };
}

export default connect(mapStateToProps, {
  getCourse,
  getStudents,
  deleteStudent,
  getAllStudents,
})(MemberPage);
