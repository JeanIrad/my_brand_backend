"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: "../env/config.env" });
var JWT = /** @class */ (function () {
    function JWT(secret, expireDate) {
        if (secret === void 0) { secret = process.env.JWT_SECRET_KEY; }
        if (expireDate === void 0) { expireDate = process.env.JWT_EXPIRATION_DATE; }
        var _this = this;
        this.secret = secret;
        this.expireDate = expireDate;
        this.signToken = function (id) {
            return jsonwebtoken_1.default.sign({ id: id }, _this.secret, {
                expiresIn: _this.expireDate,
            });
        };
        this.verifyToken = function (token, secret) {
            if (secret === void 0) { secret = process.env.SECRET_KEY; }
            return jsonwebtoken_1.default.verify(token, secret);
        };
    }
    return JWT;
}());
exports.default = JWT;
