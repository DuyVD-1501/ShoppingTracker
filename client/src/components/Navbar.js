import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const collapseClass = collapsed === true ? "collapse" : "";
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        Shopping Tracker
      </Link>
      <button
        className="navbar-toggler navbar-toggler-right collpased"
        onClick={() => setCollapsed(!collapsed)}
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`${collapseClass} navbar-collapse`} id="navbarResponsive">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Shopping List
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Create New Item
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
