import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItems } from "../actions/itemActions";
import axios from "axios";

export const EditItem = ({ history, match }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`/api/items/${match.params.id}`)
      .then((res) => {
        setName(res.data.data.name);
        setQuantity(res.data.data.quantity);
        setUnit(res.data.data.unit);
      })
      .catch((err) => console.log(err.response.data.error));
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: match.params.id,
      name,
      quantity: +quantity,
      unit,
      status: false,
    };
    // console.log(item);
    axios
      .put(`/api/items/edit/${match.params.id}`, item)
      .then((res) => console.log(res.data));
    history.push("/list");
    dispatch(getItems());
  };

  return (
    <div>
      <h3>Edit Shopping Item</h3>
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
          <input type="submit" value="Edit Item" className="btn btn-primary" />{" "}
        </div>
      </form>
    </div>
  );
};
