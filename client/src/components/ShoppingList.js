import React, { useContext, useEffect } from "react";
import { ShoppingItem } from "./ShoppingItem";
import { GlobalContext } from "../contexts/GlobalContext";

export const ShoppingList = () => {
  const { items, getItems } = useContext(GlobalContext);
  useEffect(() => {
    getItems(); // eslint-disable-next-line
  }, []);
  // console.log(items);
  const showItems = (items) => {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return <ShoppingItem key={item._id} item={item} index={index} />;
      });
    }
    return result;
  };
  return (
    <div>
      <div>
        <h3>Shopping Items:</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Order</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{showItems(items)}</tbody>
        </table>
      </div>
    </div>
  );
};
