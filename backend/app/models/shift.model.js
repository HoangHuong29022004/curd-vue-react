const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    staffName: {
        type: String,
        required: [true, "Nhập tên nhân viên"],
    },
    shiftName: {
        type: String,
        required: [true, "Nhập ca làm"],
    },
    datework: {
        type: Date,
        default: Date.now(),
        required: [true, "Nhập ngày làm"],
    }
});

module.exports = mongoose.model("Shift", shiftSchema);