const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nhập tên nhân viên"],
        trim: true,
    },
    staffId: {
        type: String,
        required: [true, "Nhập id nhân viên"],
    },
    sex: {
        type: String,
        required: [true, "Nhập giới tính"],
    },
    email: {
        type: String,
        required: [true, "Nhập email"],
    },
    role: {
        type: String,
        required: [true, "Nhập chức vụ"],
    },
    phone: {
        type: Number,
        required: [true, "Nhập SĐT"],
        maxLength: [10, "Kho không được vượt quá 10 ký tự"],
    }
});

module.exports = mongoose.model("Staff", staffSchema);