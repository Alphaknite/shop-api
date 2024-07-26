const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});
const Order = mongoose.model.Order || mongoose.model('Orders', orderSchema);
module.exports = Order;
