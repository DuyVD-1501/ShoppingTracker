import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

export const ShoppingItem = ({ item, index }) => {
  const [status, setStatus] = useState(item.status);
  const { deleteItem } = useContext(GlobalContext);

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
  return (
    <tr>
      <td className={done}>{index + 1}</td>
      <td className={done}>{item.name}</td>
      <td className={done}>{item.quantity}</td>
      <td className={done}>{item.unit}</td>
      <td className={done}>
        {" "}
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              value={status}
              onChange={(e) => setStatus(!status)}
            />{" "}
            Done!
          </label>
        </div>
      </td>
      <td>{showActions()}</td>
    </tr>
  );
};
