const express = require("express");
const router = express.Router();
const {
  getItems,
  addItem,
  deleteItem,
  getItem,
  editItem,
} = require("../controllers/items");
const auth = require("../middleware/auth");

// router.route("/").get(getItems).post(addItem);
// router.route("/:id").delete(deleteItem).get(getItem);
// router.route("/edit/:id").put(editItem);

router.route("/").get(getItems).post(auth, addItem);
router.route("/:id").delete(auth, deleteItem).get(getItem);
router.route("/edit/:id").put(editItem);

module.exports = router;
