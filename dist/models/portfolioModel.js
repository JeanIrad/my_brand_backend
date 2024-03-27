"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portfolio = void 0;
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var portfolioSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "a portfolio must have a name"],
        trim: true,
        minlength: 6,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "a portfolio must have a description"],
        trim: true,
        minlength: 20,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        trim: true,
        lower: true,
        validate: [validator_1.default.isURL, "please provide a valide url"],
    },
});
exports.Portfolio = (0, mongoose_1.model)("Portfolio", portfolioSchema);
// export default Portfolio;
