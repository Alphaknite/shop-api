const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    onSale: {
        type: Boolean,
    },
    bestSeller: {
        type: Boolean,
    },
    productImage: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model.Product || mongoose.model("Product", productSchema);
module.exports = Product;
