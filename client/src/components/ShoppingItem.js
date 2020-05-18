import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import axios from "axios";

export const ShoppingItem = ({ item, index }) => {
  const [status, setStatus] = useState(item.status);
  const { deleteItem, getItems } = useContext(GlobalContext);

  const onClick = () => {
    changeStatus();
    saveStatus();
    getItems();
  };

  const changeStatus = () => {
    setStatus(!status);
  };
  const saveStatus = () => {
    const itemNew = {
      id: item._id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      status: !item.status,
    };
    // console.log(item);
    axios
      .put(`/api/items/edit/${item._id}`, itemNew)
      .then((res) => console.log(res.data));
  };

  const showActions = () => {
    if (status === false) {
      return <Link to={`/edit/${item._id}`}>Edit</Link>; // + props.exercise._id
    } else
      return (
        <a
          href="#Link"
          style={{ color: "red" }}
          onClick={() => deleteItem(item._id)}
        >
          Delete
        </a>
      );
  };
  const done = status === true ? "done" : "";
  const buy = status === true ? "Bought!" : "Buy!";
  const buyClass = status === true ? "danger" : "primary";

  return (
    <tr>
      <td className={done}>{index + 1}</td>
      <td className={done}>{item.name}</td>
      <td className={done}>{item.quantity}</td>
      <td className={done}>{item.unit}</td>
      <td className={done}>
        {" "}
        <div className="button">
          <button
            type="button"
            value=""
            className={`btn btn-${buyClass}`}
            onClick={onClick}
          >
            {" "}
            {buy}
          </button>
        </div>
      </td>
      <td>{showActions()}</td>
    </tr>
  );
};
