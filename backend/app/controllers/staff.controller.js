const { Mongoose } = require("mongoose");
const ApiError = require("../api-error");
const Staff = require("../models/staff.model");


//tao san pham moi -- admin
exports.createStaff = async(req, res, next) => {

     if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
       const staff = await Staff.create(req.body);
       return res.status(201).json({
                success: true,
                staff,
            });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
            
        );
        
    }
};

exports.findAllStaff = async (req, res, next) => {
    try {
        const staffs = await Staff.find();
        return  res.status(201).json({
                success: true,
                staffs,
            });
    } 
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    
};

exports.findOneStaff = async(req, res, next) => {
    const staff = await Staff.findById(req.params.id);
    if(!staff) {
        return next(new ApiError(404,"Nhân viên không tồn tại!"));
    }
    try{
        res.status(200).json({
            success: true,
            staff,
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
}

exports.updateStaff = async (req, res, next) => {
    let staff = Staff.findById(req.params.id);
    if(!staff) {
        return next(new ApiError(404,"Nhân viên không tồn tại!"));
    }
    try{
        staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            staff,
            message: "Cập nhật thông tin nhân viên thành công!"
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    
};


exports.deleteStaff = async (req, res, next) => {
    const staff = await Staff.findById(req.params.id);
    if(!staff){
        return next(new ApiError(404,"Nhân viên không tồn tại!"));
    }
    try{
        await staff.remove();
            res.status(200).json({
            success: true,
            message: "Xóa nhân viên thành công!"
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    
};