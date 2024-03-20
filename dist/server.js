"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: "".concat(__dirname, "/env/config.env") });
var index_1 = __importDefault(require("./index"));
var PORT = process.env.PORT || 6000;
var DB_LOCAL = process.env.DB_LOCAL;
var DB_LOCAL_TEST = process.env.DB_LOCAL_TEST;
var DB = process.env.DB;
console.log(__dirname);
mongoose_1.default
    .connect(DB)
    .then(function () { return console.log("DB connected!"); })
    .catch(function (e) { return console.log("error!", e); });
var server = index_1.default.listen(PORT, function () {
    return console.log("app running on port ".concat(PORT, "... "));
});
console.log(process.env.NODE_ENV);
exports.default = server;
