import React, { useState, useEffect } from "react";
import { register } from "../../actions/authActions";
import { clearErros } from "../../actions/errorActions";
import { useSelector, useDispatch } from "react-redux";

export const Register = ({ history, match }) => {
  const [name, setName] = useState("");
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
    const newUser = { name, email, password };
    dispatch(register(newUser));
  };

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
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
      <h3>Register</h3>
      {msg ? (
        <div className="alert alert-danger" role="alert">
          {msg}
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name :</label>
          <input
            type="text"
            className="form-control"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
