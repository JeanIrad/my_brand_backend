"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var GlobalError = /** @class */ (function () {
    function GlobalError() {
    }
    GlobalError.sendErrorDev = function (err, req, res, next) {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || "error";
        var castError = __assign({}, err);
        if (err.name === "ValidationError") {
            var error = __assign({}, err);
            return res.status(400).json({
                message: Object.values(error.errors)
                    .map(function (el) { return el.message; })
                    .join(" "),
            });
        }
        if (err.name === "Error") {
            return res.status(err.statusCode).json({
                message: err.message,
                // name: err.name,
            });
        }
        if (err.name === "JsonWebTokenError")
            return res.status(400).json({
                message: "invalid token!",
            });
        if (err.name === "TokenExpiredError")
            return res.status(400).json({
                message: "token expired, please login to proceed!",
            });
        if (err.name === "CastError")
            return res.status(404).json({
                // message: `Invalid ${err.path}: ${err.value}`,
                message: "Invalid ".concat(castError.path, ": ").concat(castError.value, "."),
            });
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            name: err.name,
            err: err,
        });
    };
    return GlobalError;
}());
exports.default = GlobalError;
