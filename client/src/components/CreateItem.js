import React, { useState } from "react";
import { v1 } from "uuid";
import { useDispatch } from "react-redux";
import { getItems, addItem } from "../actions/itemActions";

export const CreateItem = ({ history }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: v1(),
      name,
      quantity: +quantity,
      unit,
      status: false,
    };
    dispatch(addItem(newItem));
    history.push("/list");
    dispatch(getItems());
  };
  return (
    <div>
      <h3>Create New Shopping Item</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name :</label>
          <input
            type="text"
            required
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            required
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>Unit :</label>
          <input
            type="text"
            required
            name="unit"
            className="form-control"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Item"
            className="btn btn-primary"
          />{" "}
        </div>
      </form>
    </div>
  );
};
