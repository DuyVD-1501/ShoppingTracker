import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  items: [],
  error: null,
  loading: true,
};
export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getItems() {
    try {
      const res = await axios.get("/api/items");
      dispatch({
        type: "GET_ITEMS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "ITEM_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteItem(id) {
    try {
      await axios.delete(`/api/items/${id}`);
      dispatch({
        type: "DELETE_ITEM",
        payload: id,
      });
      const res = await axios.get("/api/items");
      dispatch({
        type: "GET_ITEMS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "ITEM_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addItem(item) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/items", item, config);
      dispatch({
        type: "ADD_ITEM",
        payload: res.data.data, // res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "PRODUCT_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        items: state.items,
        error: state.error,
        loading: state.loading,
        deleteItem,
        addItem,
        getItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
