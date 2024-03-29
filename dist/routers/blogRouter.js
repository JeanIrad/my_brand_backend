"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var blogController_1 = __importDefault(require("../controllers/blogController"));
var authController_1 = __importDefault(require("../controllers/authController"));
var upload_1 = __importDefault(require("../middleware/upload"));
var getAllBlogs = blogController_1.default.getAllBlogs, createBlog = blogController_1.default.createBlog, deleteBlog = blogController_1.default.deleteBlog, updateBlog = blogController_1.default.updateBlog, getBlog = blogController_1.default.getBlog;
var protectRoutes = authController_1.default.protectRoutes, checkAdmin = authController_1.default.checkAdmin;
var blogRouter = (0, express_1.Router)();
var blogUpload = (0, upload_1.default)("blogs", "image");
blogRouter
    .route("/")
    .get(getAllBlogs)
    .post(function (req, res, next) {
    console.log("receiving", req.body);
    if (req.file) {
        console.log(req.file.filename);
        next();
    }
    else {
        next();
    }
}, blogUpload, createBlog);
blogRouter
    .route("/:id")
    .get(getBlog)
    .patch(protectRoutes, checkAdmin, blogUpload, updateBlog)
    .delete(protectRoutes, checkAdmin, deleteBlog);
exports.default = blogRouter;
