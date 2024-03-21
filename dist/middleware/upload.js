"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var dir = "./uploads/images";
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, "".concat(file.fieldname, "_").concat(Date.now()).concat(path_1.default.extname(file.originalname)));
    },
});
var storage = multer_1.default.diskStorage({
    destination: function (req, file, callBack) {
        var dir = "../uploads/images";
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        callBack(null, dir);
    },
    filename: function (req, file, callBack) {
        callBack(null, "".concat(file.fieldname, "_").concat(Date.now()).concat(path_1.default.extname(file.originalname)));
        // callBack(null, `_${Date.now()}_${file.originalname}`);
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
// console.log(__dirname);
exports.default = upload;
