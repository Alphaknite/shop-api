const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ordersController = require("../controllers/orders");

router.get("/", checkAuth, ordersController.getAllOrders); //get all orders
router.get("/:id", checkAuth, ordersController.getSingleOrder); //get a single order by id
router.post("/", checkAuth, ordersController.createOrder); //create order
router.delete("/:id", checkAuth, ordersController.deleteOrder ); //delete order

module.exports = router;
