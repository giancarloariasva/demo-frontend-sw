import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Homepage
          </Link>
          <Link className="navbar-brand" to="/contestants">
            Get List
          </Link>
          <Link className="navbar-brand" to="/createcontestant">
            Create One
          </Link>
        </div>
      </nav>
    )
  }
}