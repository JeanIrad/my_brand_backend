"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var VerifyToken = (0, mongoose_1.model)("VerifyToken", new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
        expires: "10m",
    },
}));
exports.default = VerifyToken;
