import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

export default function Logout({ history }) {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(logout());
    // history.push("/");
  };

  return (
    <div>
      <a
        name=""
        id=""
        onClick={onClick}
        className="btn btn-primary"
        href="/"
        role="button"
      >
        Log out
      </a>
    </div>
  );
}
