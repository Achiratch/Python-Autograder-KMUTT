import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
//CSS
import "../member_page/member_page.css";

//ANTD
import { Breadcrumb } from "antd";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

//Material-UI
import { LinearProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import AddPopup from "./add_dialog";


const columns = [
  { field: "id", headerName: "ID", width: 200, sortable: false },
  { field: "firstName", headerName: "First name", width: 200, sortable: false },
  { field: "lastName", headerName: "Last name", width: 200, sortable: false },
  {
    field: "email",
    headerName: "Email",
    type: "number",
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

function MemberPage() {
  //------Fetch Data---------------------------------------------
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const res = await fetch(
        "https://6034c968843b150017933491.mockapi.io/users"
      )
        .then((response) => response.json())
        .then((json) => setData(json));
      setLoading(false);
    };

    fetchMembers();
  }, []);
  //---------------------------------------------------------------

  //------Search---------------------------------------------------
  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toLowerCase().indexOf(q) > -1 ||
        row.firstName.toLowerCase().indexOf(q) > -1 ||
        row.lastName.toLowerCase().indexOf(q) > -1 ||
        row.email.toLowerCase().indexOf(q) > -1
    );
  }
  //---------------------------------------------------------------

  const data_test = search(data);
  const number_student = data.length;
  return (
    <div>
      <Navbar />
      <div className="body">
        <Sidebar />
        <div className="page-content">
          <div className="head-content">
            <h1>Member</h1>
            <Breadcrumb>
              <Breadcrumb.Item href="/home">My Course</Breadcrumb.Item>
              <Breadcrumb.Item>CSS101</Breadcrumb.Item>
              <Breadcrumb.Item>Member</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {loading ? (
            <LinearProgress />
          ) : (
            <div className="table-content">
              <div>
                <span className="number-student">
                  <span>
                    <h6 className="font-size-number">
                      {number_student} Students
                    </h6>
                  </span>
                </span>
                <span className="button-member">
                  <button className="delete-button">
                    <span className="icon-button">
                      <FontAwesomeIcon icon={faUserMinus} size="lg" />
                    </span>
                    Remove Students
                  </button>
                </span>
                <span className="button-member">
                  <AddPopup />
                </span>

                <input
                  className="search-box"
                  type="text"
                  placeholder="Search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                ></input>
              </div>

              <div className="flex" style={{ height: 720, width: "100%" }}>
                <DataGrid
                  rows={data_test}
                  columns={columns}
                  pageSize={10}
                  checkboxSelection
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default MemberPage;
