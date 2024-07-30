const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ordersController = require("../controllers/orders");

const { orderLog } = require("../../utils/logEvents");
const EventEmitter = require("node:events");
const myEmitter = new EventEmitter();

const Order = require("../models/order");
const Product = require("../models/product");

myEmitter.on("orderLog", (orderId) => {
    orderLog(orderId);
});

router.get("/", checkAuth, ordersController.getAllOrders); //get all orders
router.get("/:id", checkAuth, ordersController.getSingleOrder); //get a single order by id
router.post("/", checkAuth, ordersController.createOrder); //create order
router.delete("/:id", checkAuth, ordersController.deleteOrder ); //delete order

module.exports = router;
