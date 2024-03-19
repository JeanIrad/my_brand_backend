"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutMe = void 0;
var mongoose_1 = require("mongoose");
exports.AboutMe = (0, mongoose_1.model)("AboutMe", new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 20,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    cv: {
        data: Buffer,
        contentType: String,
    },
}));
