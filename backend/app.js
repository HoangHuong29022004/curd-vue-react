const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const staff = require("./app/routes/staff.route");
const product = require("./app/routes/product.route")
const category = require("./app/routes/category.route")
const shift = require("./app/routes/shift.route")
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api", staff);
app.use("/api", product);
app.use("/api", category);
app.use("/api", shift);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to management application." });
});


module.exports = app;