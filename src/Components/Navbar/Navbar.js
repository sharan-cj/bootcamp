import React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../Home/Home";
import CreateTask from "../CreateTask/CreateTask";
import Score from "../Score/Score";
import Login from "../Login/Login";
import "./Navbar.css";

export default function Navbar() {
  return (
    <Router>
      <div>
        <div className="nav-bar">
          <h1>Bootcamp</h1>
          <ul>
            <li>
              <NavLink to="/home" exact activeClassName='highlight'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/createtask" activeClassName='highlight'>Create Task</NavLink>
            </li>
            <li>
              <NavLink to="/scores" activeClassName='highlight'>Scores</NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/createtask" component={CreateTask} />
          <Route path="/scores" component={Score} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}
