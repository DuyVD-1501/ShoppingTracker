import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => async (dispatch) => {
  try {
    dispatch(setItemLoading());
    const res = await axios.get("/api/items");
    dispatch({ type: GET_ITEMS, payload: res.data.data });
  } catch (error) {
    dispatch({ payload: error.message });
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const addItem = (item) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/api/items", item, tokenConfig(getState));
    dispatch({ type: ADD_ITEM, payload: res.data.data });
  } catch (error) {
    dispatch({ payload: error.message });
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deleteItem = (id) => async (dispatch, getState) => {
  await axios.delete(`/api/items/${id}`, tokenConfig(getState));
  dispatch({ type: DELETE_ITEM, payload: id });
};

export const setItemLoading = () => {
  return { type: ITEMS_LOADING };
};
