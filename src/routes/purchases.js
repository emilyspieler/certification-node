const express = require("express");
const router = express.Router();

const purchaseController = require("../controllers/purchaseController");

router.post("/lists/:listId/items/:itemId/purchases/create",
  purchaseController.create);

router.post("/lists/:listId/items/:itemId/purchases/:id/destroy",
  purchaseController.destroy);

module.exports = router;
