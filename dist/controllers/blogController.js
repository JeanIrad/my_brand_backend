"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var appError_1 = __importDefault(require("../utils/appError"));
var blogModel_1 = __importDefault(require("../models/blogModel"));
var cloudinary_1 = __importDefault(require("../utils/cloudinary"));
var fs_1 = __importDefault(require("fs"));
var BlogController = /** @class */ (function () {
    function BlogController() {
    }
    var _a;
    _a = BlogController;
    BlogController.getAllBlogs = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var blogs;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, blogModel_1.default.find({}, { __v: false }).populate({
                        path: "author",
                        select: "firstName lastName",
                    })];
                case 1:
                    blogs = _b.sent();
                    res.status(200).json({
                        status: "success",
                        size: blogs.length,
                        data: blogs,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    BlogController.createBlog = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var uploadImage, newBlog;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("body", req.body);
                    return [4 /*yield*/, cloudinary_1.default.uploader.upload(req.file.path)];
                case 1:
                    uploadImage = _c.sent();
                    return [4 /*yield*/, new blogModel_1.default({
                            title: req.body.title,
                            description: req.body.description,
                            imageUrl: uploadImage.secure_url,
                            fileName: ((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename) || "",
                            author: req.body.author,
                        }).save()];
                case 2:
                    newBlog = _c.sent();
                    res.status(201).json({
                        status: "success",
                        data: newBlog,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    BlogController.updateBlog = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, blog;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    console.log(req.body, req.headers.authorization);
                    return [4 /*yield*/, blogModel_1.default.findByIdAndUpdate(id, req.body, {
                            new: true,
                            runValidators: true,
                        })];
                case 1:
                    blog = _b.sent();
                    if (!blog) {
                        return [2 /*return*/, next(new appError_1.default("No Blog Found with id ".concat(id), 404))];
                    }
                    res.status(201).json({
                        status: "success",
                        data: blog,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    BlogController.deleteBlog = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var blog, fileFoundMssg, id, deleteBlog, filePath;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, blogModel_1.default.findByIdAndDelete(req.params.id)];
                case 1:
                    blog = _b.sent();
                    if (!blog) {
                        return [2 /*return*/, next(new appError_1.default("No blog found with Id ".concat(req.params.id), 404))];
                    }
                    fileFoundMssg = "";
                    id = req.params.id;
                    return [4 /*yield*/, blogModel_1.default.findById(id)];
                case 2:
                    deleteBlog = _b.sent();
                    filePath = path_1.default.resolve(__dirname, "../uploads/blogs/".concat(deleteBlog === null || deleteBlog === void 0 ? void 0 : deleteBlog.fileName));
                    if (!fs_1.default.existsSync(filePath)) {
                        fileFoundMssg = "no file attached";
                    }
                    else {
                        fs_1.default.unlink(filePath, function (err) {
                            if (err) {
                                console.log("error");
                                return next(new appError_1.default("failed to delete file", 500));
                            }
                            else {
                                fileFoundMssg = "file deleted successfully!";
                            }
                        });
                    }
                    res.status(200).json({
                        status: "success",
                        message: "deleted successfully!",
                        fileFoundMssg: fileFoundMssg,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    BlogController.getBlog = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, blog;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, blogModel_1.default.findById(id).populate({
                            path: "author",
                            select: "firstName lastName",
                        })];
                case 1:
                    blog = _b.sent();
                    if (!blog) {
                        return [2 /*return*/, next(new appError_1.default("No blog found with the id ".concat(id), 404))];
                    }
                    res.status(200).json({
                        status: "success",
                        blog: blog,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    return BlogController;
}());
exports.default = BlogController;
