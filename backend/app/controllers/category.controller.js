const { Mongoose } = require("mongoose");
const ApiError = require("../api-error");
const Category = require("../models/category.model");


//tao san pham moi -- admin
exports.createCategory = async(req, res, next) => {
    
     if (!req.body?.categoryName) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
       const category = await Category.create(req.body);
       return res.status(201).json({
                success: true,
                category,
            });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
            
        );
        
    }
};

exports.findAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.find();
        return  res.status(201).json({
                success: true,
                categories,
            });
    } 
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }  
};

exports.deleteCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        return next(new ApiError(404,"Danh mục sản phẩm không tồn tại!"));
    }
    try{
        await category.remove();
            res.status(200).json({
            success: true,
            message: "Xóa danh mục thành công!"
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    } 
};