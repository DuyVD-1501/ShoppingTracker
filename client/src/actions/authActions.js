import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCESS,
  REGISTER_FAIL,
} from "../actions/types";

//Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  try {
    const { data } = await axios.get("/api/auth/user", tokenConfig(getState));
    dispatch({ type: USER_LOADED, payload: data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

//Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  //Request body
  const body = JSON.stringify({ name, email, password });
  try {
    const { data } = await axios.post("/api/users", body, config);
    dispatch({ type: REGISTER_SUCESS, payload: data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "REGISTER_FAIL")
    );
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  //Request body
  const body = JSON.stringify({ email, password });
  try {
    const { data } = await axios.post("/api/auth", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
    );
    dispatch({ type: LOGIN_FAIL });
  }
};

//Logout User
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

//Set up config/headers and token
export const tokenConfig = (getState) => {
  //get token from localStorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token,add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
