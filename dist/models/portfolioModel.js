"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portfolio = void 0;
var mongoose_1 = require("mongoose");
var portfolioSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "a portfolio must have a name"],
        trim: true,
        minlength: 6,
    },
    description: {
        type: String,
        required: [true, "a portfolio must have a description"],
        trim: true,
        minlength: 20,
    },
    image: {
        type: String,
        required: true,
    },
});
exports.Portfolio = (0, mongoose_1.model)("Portfolio", portfolioSchema);
// export default Portfolio;
