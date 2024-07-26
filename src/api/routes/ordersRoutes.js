const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const Product = require("../models/product");

//Get all orders
router.get("/", async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate("product");
        const response = {
            count: orders.length,
            orders: orders.map((order) => {
                return {
                    _id: order._id,
                    product: {
                        _id: order.product._id,
                        name: order.product.name,
                        price: order.product.price,
                        stock: order.product.stock,
                        productImage: order.product.productImage,
                    },
                    quantity: order.quantity,
                    requests: {
                        type: "GET",
                        description: "Get all orders",
                        url: `${process.env.BASE_URL}/orders/${order._id}`,
                    },
                };
            }),
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Create a new order
router.post("/", async (req, res, next) => {
    try {
        const { product, quantity } = req.body;

        // Check if the product exists
        const productExists = await Product.findById(product);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }

        const order = new Order({
            product,
            quantity,
        });
        const savedProduct = await order.save();

        res.status(201).json({
            message: "Order Placed!",
            placedOrder: {
                _id: order._id,
                product: order.product,
                quantity: order.quantity,
            },
            request: {
                type: "GET",
                url: `${process.env.BASE_URL}/orders/${order._id}`,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get a single order by id
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id).populate("product");
        const response = {
            _id: order._id,
            product: {
                _id: order.product._id,
                name: order.product.name,
                price: order.product.price,
                stock: order.product.stock,
                productImage: order.product.productImage,
            },
            quantity: order.quantity,
            request: {
                type: "GET",
                description: "Get a single order by ID",
                url: `${process.env.BASE_URL}/orders/${order._id}`,
            },
        };
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete an order by id
router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Order.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order deleted",
            deletedOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity,
                request: {
                    method: "POST",
                    url: `${process.env.BASE_URL}/orders`,
                    body: { product: "ID", quantity: "Number" },
                },
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
