import React from "react";
import Header from "./header";
import Footer from "./footer";
import Login from "./login";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = { title: "Tsutomu", name: "not login" };
  }
  changeTitle(title) {
    this.setState({ title });
  }

  changeName(name) {
    this.setState({ name });
  }
  render() {
    setTimeout(() => {
      if (this.state.title == "Tsutomu") {
      } else {
      }
    }, 1000);
    return (
      <div>
        <div class="loginuser">{this.state.name}</div>

        <Header
          changeTitle={this.changeTitle.bind(this)}
          title={this.state.title}
        />
        <Login changeName={this.changeName.bind(this)} name={this.state.name} />
        <Footer />
      </div>
    );
  }
}
