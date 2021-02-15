import React from "react";

export default class Login extends React.Component {
  handleChange(e) {
    const name = document.getElementById("username").value;
    this.props.changeName(name);
  }
  render() {
    return (
      <div>
        <input type="text" id="username" />
        <input type="text" id="password" />
        <button id="login" onClick={this.handleChange.bind(this)}>
          Sign In
        </button>
      </div>
    );
  }
}
