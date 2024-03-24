"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// import { userSchema } from "./userModel";
var validator_1 = __importDefault(require("validator"));
var Message = (0, mongoose_1.model)("Message", new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, "please provide a name"],
        trim: true,
        minlength: 3,
    },
    message: {
        type: String,
        required: [true, "a message must have a description"],
        trim: true,
        minlength: 20,
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        validate: [validator_1.default.isEmail, "provide a valid email"],
    },
    interest: {
        type: String,
        enum: [
            "Web design",
            "data Analysis",
            "Mobile Development",
            "UI/UX Design",
            "Backend Development",
            "Frontend Development",
            "Fullstack Development",
            "Others  ",
        ],
        required: true,
    },
}));
exports.default = Message;
