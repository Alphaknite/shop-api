const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");

const { productLog } = require("../../utils/logEvents");
const EventEmitter = require("node:events");
const myEmitter = new EventEmitter();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

myEmitter.on("productLog", (productName, productId) => {
    productLog(productName, productId);
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

//Get all products
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find({});
        const response = {
            count: products.length,
            products: products.map((product) => {
                return {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    stock: product.stock,
                    productImage: product.productImage,
                    request: {
                        type: "GET",
                        description: "Get all products",
                        url: `${process.env.BASE_URL}/products/${product._id}`,
                    },
                };
            }),
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Create a new product
router.post("/", upload.single("productImage"), async (req, res, next) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            productImage: req.file.path,
        });

        const savedProduct = await product.save();
        res.status(201).json({
            message: "Product created!",
            createdProduct: {
                _id: savedProduct._id,
                name: savedProduct.name,
                price: savedProduct.price,
                stock: savedProduct.stock,
                productImage: savedProduct.productImage,
                request: {
                    type: "GET",
                    url: `http://localhost:3000/products/${savedProduct._id}`,
                },
            },
        });
        myEmitter.emit("productLog", savedProduct.name, savedProduct._id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get a single product by id
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        const response = {
            _id: product._id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            productImage: product.productImage,
            request: {
                type: "GET",
                description: "Get a single product by ID",
                url: `${process.env.BASE_URL}/products/${product._id}`,
            },
        };
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update a product by id
router.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (updatedProduct) {
            res.status(200).json({
                message: "Product Updated",
                request: {
                    type: "GET",
                    url: `${process.env.BASE_URL}/products/${id}`,
                },
            });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted",
            deletedProduct: {
                _id: deletedProduct._id,
                name: deletedProduct.name,
                price: deletedProduct.price,
                stock: deletedProduct.stock,
                productImage: deletedProduct.productImage,
                request: {
                    type: "POST",
                    url: `${process.env.BASE_URL}/products`,
                    body: {
                        name: "String",
                        price: "Number",
                        stock: "Number",
                        productImage: "File",
                    },
                },
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
