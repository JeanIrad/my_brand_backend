"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = "./uploads/images";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });
// const storage = multer.diskStorage({
//   destination: function (req, file, callBack) {
//     const dir = "../uploads/images";
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     callBack(null, dir);
//   },
//   filename: function (req, file, callBack) {
//     callBack(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//     // callBack(null, `_${Date.now()}_${file.originalname}`);
//   },
// });
// const filterFile = (req: any, file: any, callBack: Function) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png"
//   ) {
//     callBack(null, true);
//   } else {
//     callBack({ message: "unsupported file format" }, false);
//   }
// };
// const upload = multer({
//   storage,
//   limits: { fileSize: 1024 * 1024 },
//   fileFilter: filterFile,
// });
// import path from "path";
// import multer from "multer";
// import fs from "fs";
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
var storage = function (handler) {
    return multer_1.default.diskStorage({
        destination: function (req, file, callBack) {
            var dir;
            switch (handler) {
                case "handler1":
                    dir = "../uploads/handler1";
                    break;
                case "handler2":
                    dir = "../uploads/handler2";
                    break;
                default:
                    dir = "../uploads/default";
            }
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            callBack(null, dir);
        },
        filename: function (req, file, callBack) {
            callBack(null, "".concat(file.fieldname, "_").concat(Date.now()).concat(path_1.default.extname(file.originalname)));
        },
    });
};
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
var upload = function (handler, fieldName) {
    return (0, multer_1.default)({
        storage: storage(handler),
        limits: { fileSize: 1024 * 1024 },
        fileFilter: filterFile,
    }).single(fieldName);
};
exports.default = upload;
// console.log(__dirname);
// export default upload;
