const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");
const checkAuth = require("../middleware/check-auth");
const checkAdmin = require("../middleware/check-admin");

router.get("/", checkAuth, checkAdmin, ordersController.getAllOrders); //get all orders
router.get("/:id", checkAuth, checkAdmin, ordersController.getSingleOrder); //get a single order by id
router.post("/", checkAuth, checkAdmin, ordersController.createOrder); //create order
router.delete("/:id", checkAuth, checkAdmin, ordersController.deleteOrder ); //delete order

module.exports = router;
