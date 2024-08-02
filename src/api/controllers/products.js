const Product = require("../models/product");
const { productLog } = require("../../utils/logEvents");
const EventEmitter = require("node:events");
const myEmitter = new EventEmitter();

myEmitter.on("productLog", (productName, productId) => {
    productLog(productName, productId);
});

module.exports = {
    getAllProducts: async (req, res, next) => {
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
                        category: product.category,
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
    },
    getSingleProduct: async (req, res, next) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
            const response = {
                _id: product._id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                category: product.category,
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
    },
    createProduct: async (req, res, next) => {
        try {
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category,
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
                    category: product.category,
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
    },
    updateProduct: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updateData = req.body;
            if (req.file) {
                updateData.productImage = req.file.path;
            }
    
            if (!id) {
                return res.status(400).json({ message: "Invalid ID" });
            }
    
            const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            });
    
            if (updatedProduct) {
                res.status(200).json({
                    message: "Product Updated",
                    product: updatedProduct,
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
    },
    deleteProduct: async (req, res, next) => {
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
    },
}