const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: [true, "Nhập id danh mục"],
    },
    categoryName: {
        type: String,
        required: [true, "Nhập danh mục sản phẩm"],
        trim: true,
    },
});


module.exports = mongoose.model("Category", categorySchema);