const { Mongoose } = require("mongoose");
const ApiError = require("../api-error");
const Product = require("../models/product.model");

exports.createProduct = async(req, res, next) => {

     if (!req.body?.productName) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
       const product = await Product.create(req.body);
       return res.status(201).json({
                success: true,
                product,
            });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
            
        );
        
    }
};

exports.findAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find();
        return  res.status(201).json({
                success: true,
                products,
            });
    } 
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }  
};

exports.findOneProduct = async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ApiError(404,"sản phẩm không tồn tại!"));
    }
    try{
        res.status(200).json({
            success: true,
            product,
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
}

exports.updateProduct = async (req, res, next) => {
    let product = Product.findById(req.params.id);
    if(!product) {
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
    try{
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            product,
            message: "Cập nhật sản phẩm thành công!"
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    
};


exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ApiError(404,"Sản phẩm không tồn tại!"));
    }
    try{
        await product.remove();
            res.status(200).json({
            success: true,
            message: "Xóa sản phẩm thành công!"
        })
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    
};