import React from "react";
import ReactDOM from "react-dom";
import "../index.css";
import axios from "axios";
import reportWebVitals from "../reportWebVitals";
import { BrowserRouter, Link, Route } from "react-router-dom";

class Users {
  constructor() {
    this.users = [];
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }
    return undefined;
  }

  setUser(user) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === user.id) {
        this.users[i].name = user.name;
        this.users[i].email = user.email;
      }
    }
  }
}

const userList = new Users();

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    var username = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    axios.defaults.baseURL = "http://localhost:8080";
    axios
      .get("/getLogin", {
        params: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data });
      });
    //userList.setUser(this.state.user);
    this.props.history.push("/UserList");
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="userName" id="userName" />
        <input type="password" name="password" id="password" />
        <button type="submit">Next→</button>
      </form>
    );
  }
}

export default SignIn;
