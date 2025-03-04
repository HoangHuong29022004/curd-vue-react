const { Mongoose } = require("mongoose");
const ApiError = require("../api-error");
const Shift = require("../models/shift.model");


//tao san pham moi -- admin
exports.createShift = async(req, res, next) => {
     if (!req.body?.shiftName) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
      const shift = await Shift.create(req.body);
       return res.status(201).json({
                success: true,
                 shift,
            });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
            
        );
        
    }
};

exports.findAllShift = async (req, res, next) => {
    try {
        const shifts = await Shift.find();
        return  res.status(201).json({
                success: true,
                shifts,
            });
    } 
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }  
};

exports.findOneShift = async(req, res, next) => {
    const shift = await Shift.findById(req.params.id);
    if(!shift) {
        return next(new ApiError(404,"ca làm không tồn tại!"));
    }
    try{
        res.status(200).json({
            success: true,
            shift,
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
}

exports.deleteShift = async (req, res, next) => {
    const shift = await Shift.findById(req.params.id);
    if(!shift ){
        return next(new ApiError(404,"ca làm không tồn tại!"));
    }
    try{
        await shift.remove();
            res.status(200).json({
            success: true,
            message: "Xóa ca làm thành công!"
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    } 
};

exports.updateShift = async (req, res, next) => {
    let shift = Shift.findById(req.params.id);
    if(!shift) {
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
    try{
        shift = await Shift.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            shift,
            message: "Cập nhật ca làm thành công!"
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    
};