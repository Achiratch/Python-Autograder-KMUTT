import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer";
import Navbar from "../../layout/navbar";
import Sidebar from "../../layout/sidebar";
//CSS
import "../member_page/member_page.css";

//ANTD
import { Breadcrumb } from "antd";
import { Pagination } from "antd";

//React-Table
import { useTable } from "react-table";

//ICON Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";

//Material-UI
import { responsiveFontSizes, Table } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { LinearProgress } from "@material-ui/core";

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
  const columns = data[0] && Object.keys(data[0]);
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
                      {number_student} Student
                    </h6>
                  </span>
                </span>
                <span className="button-member">
                  <button className="delete-button">
                    <span className="icon-button">
                      <FontAwesomeIcon icon={faUserMinus} size="lg" />
                    </span>
                    Remove Member
                  </button>
                </span>
                <span className="button-member">
                  <button className="add-member-button">
                    <span className="icon-button">
                      <FontAwesomeIcon icon={faUserPlus} size="lg" />
                    </span>
                    Add Member
                  </button>
                </span>

                <input
                  className="search-box"
                  type="text"
                  placeholder="Search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                ></input>
              </div>

              <table className="table">
                <thead>
                  <tr className="border-table-header">
                    <th>ID</th>
                    <th>Fisrt Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data_test.map((row) => (
                    <tr className="table-body">
                      {columns.map((column) => (
                        <td>{row[column]} </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination defaultCurrent={1} total={number_student} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default MemberPage;
