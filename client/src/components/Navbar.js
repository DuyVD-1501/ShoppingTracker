import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const collapseClass = collapsed === true ? "collapse" : "";
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const authLinkks = (
    <div>
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link
            to="/list"
            className="nav-link"
            style={{ color: "yellow", fontWeight: "bold" }}
          >
            {user ? `Welcome ${user.name}` : ""}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/list" className="nav-link">
            Shopping List
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/create" className="nav-link">
            Create New Item
          </Link>
        </li>

        <li className="navbar-item">
          <Link to="/logout" className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <div>
      <ul className="navbar-nav mr-right">
        <li className="navbar-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );

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
        {isAuthenticated ? authLinkks : guestLinks}
      </div>
    </nav>
  );
};
