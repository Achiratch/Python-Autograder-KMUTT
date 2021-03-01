import React, { useState, useEffect } from "react";
import Footer from "./layout/footer";
import Navbar from "./layout/navbar";
import Sidebar from "./layout/sidebar";
//ANTD
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

//React-Table
import { useTable } from "react-table";

//Material-UI
import { responsiveFontSizes, Table } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function MemberPage() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("https://6034c968843b150017933491.mockapi.io/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function search(rows) {
    return rows.filter(
      (row) =>
        row.id.toLowerCase().indexOf(q) > -1 ||
        row.firstName.toLowerCase().indexOf(q) > -1 ||
        row.lastName.toLowerCase().indexOf(q) > -1 ||
        row.email.toLowerCase().indexOf(q) > -1
    );
  }
  const data_test = search(data);
  const columns = data[0] && Object.keys(data[0]);

  return (
    <div>
      <Navbar />
      <div className="body">
        <Sidebar />
        <div className="page-content">
          <div className="head-content">
            <h1>Member</h1>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <UserOutlined />
                <span>Application List</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Application</Breadcrumb.Item>
            </Breadcrumb>
            <input
              className="search-box"
              type="text"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            ></input>
          </div>
          <div className="table-content">
            <table className="table ">
              <thead>
                <tr className="border-table-header">
                  <th>ID</th>
                  <th>Fisrt Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody >
                {data_test.map((row) => (
                  <tr className="table-body">
                    {columns.map((column) => (
                      <td >{row[column]} </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default MemberPage;
