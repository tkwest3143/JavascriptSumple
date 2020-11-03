import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import axios from "axios";
import reportWebVitals from "../reportWebVitals";
import { BrowserRouter, Link, Route } from "react-router-dom";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      isLoading: true,
    };
    this.getUserList = this.getUserList.bind(this);
  }

  getUserList() {
    axios.defaults.baseURL = "http://localhost:8080";
    axios
      .get("/getUserList", {
        params: {
          username: "tk",
          password: "tk",
        },
      })
      .then((res) => {
        const data = res.data.content;
        this.state.user = res.data.results;
        this.setState({
          user: res.data,
        });
      });
  }

  render() {
    this.getUserList();
    const userRows = (
      <tr>
        <td>{this.state.user.UserID}</td>
        <td>
          <Link to={"/users/" + this.state.user.UserID + "/edit"}>
            {this.state.user.UserName}
          </Link>
        </td>
        <td>{this.state.user.MailAddress}</td>
      </tr>
    );
    return (
      <div>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>{userRows}</tbody>
        </table>
      </div>
    );
  }
}
export default UserList;
