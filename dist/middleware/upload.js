"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, path_1.default.resolve(__dirname, "../uploads/blogs"));
    },
    filename: function (req, file, callBack) {
        callBack(null, "_".concat(Date.now(), "_").concat(file.originalname));
    },
});
var filterFile = function (req, file, callBack) {
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png") {
        callBack(null, true);
    }
    else {
        callBack({ message: "unsupported file format" }, false);
    }
};
var upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: filterFile,
});
exports.default = upload;
