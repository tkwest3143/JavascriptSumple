import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SignIn from "./js/SignIn";
import SignUp from "./js/SignUp";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

ReactDOM.render(<Index name="Tanaka" />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function Index(props) {
  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Switch>
          <Route path="/SignIn" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function Menu() {
  return (
    <ul className="menu">
      <li>
        <Link to="/SignIn">SignIn</Link>
      </li>
      <li>
        <Link to="/SignUp">SignUp</Link>
      </li>
    </ul>
  );
}
