const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Nhập tên sản phẩm"],
        trim: true,
    },
    productId: {
        type: String,
        required: [true, "Nhập id sản phẩm"],
    },
    category: {
        type: String,
        required: [true, "Nhập danh mục sản phẩm"],
    },
    price: {
        type: Number,
        required: [true, "Nhập giá tiền"],
    },
    quantity: {
        type: Number,
        required: [true, "Nhập số lượng"],
    }
});

module.exports = mongoose.model("Product", productSchema);