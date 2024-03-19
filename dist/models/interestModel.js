"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interest = void 0;
var mongoose_1 = require("mongoose");
exports.Interest = (0, mongoose_1.model)("Interest", new mongoose_1.Schema({
    interest: {
        type: String,
        required: [, "choose your interest!"],
        enum: ["Web design", "Data analytics", "system analysis", "others"],
        default: "others",
    },
}));
