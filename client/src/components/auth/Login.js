import React, { useState, useEffect } from "react";
import { login } from "../../actions/authActions";
import { clearErros } from "../../actions/errorActions";
import { useSelector, useDispatch } from "react-redux";

export const Login = ({ history, match }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const error = useSelector((state) => state.error);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearErros());
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };
  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
    if (isAuthenticated) {
      history.push("/");
    }
  }, [{ error }]);

  return (
    <div>
      <h3>Login</h3>
      {msg ? (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>Password :</label>
          <input
            type="password"
            className="form-control"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-primary" />{" "}
        </div>
      </form>
    </div>
  );
};
