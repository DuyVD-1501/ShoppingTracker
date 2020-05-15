const Item = require("../models/Item");

//@desc Get all items
//@eoutr GET /api/items
//@acess Public
exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: " Server Error",
    });
  }
};

//@desc GET item
//@eoutr GET /api/items/:id
//@acess Public
exports.getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: "No item found",
      });
    }
    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: " Server Error",
    });
  }
};

//@desc Add item
//@eoutr POST /api/items
//@acess Public
exports.addItem = async (req, res, next) => {
  try {
    const { name, quantity, unit, status } = req.body;
    const item = await Item.create(req.body);
    return res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        sucess: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: " Server Error",
      });
    }
  }
};

//@desc Edit item
//@eoutr PUT /api/items/:id
//@acess Public
exports.editItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: "No item found",
      });
    }
    const { name, quantity, unit, status } = req.body;
    // item = { name, quantity, unit, status };
    item.name = name;
    item.quantity = quantity;
    item.unit = unit;
    item.status = status;
    item.save();
    return res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: " Server Error",
    });
  }
};

//@desc Delete item
//@eoutr DELETE /api/items/:id
//@acess Public
exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        error: "No item found",
      });
    }
    await item.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: " Server Error",
    });
  }
};
