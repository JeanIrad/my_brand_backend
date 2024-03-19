"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HandleInvalidUrl = /** @class */ (function () {
    function HandleInvalidUrl() {
    }
    HandleInvalidUrl.handleInvalidUrl = function (req, res) {
        res.status(404).json({
            status: "fail",
            message: "Page not found!",
        });
    };
    return HandleInvalidUrl;
}());
exports.default = HandleInvalidUrl;
