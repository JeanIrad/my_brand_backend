"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = __importDefault(require("../models/userModel"));
var appError_1 = __importDefault(require("../utils/appError"));
var jwt_1 = __importDefault(require("../utils/jwt"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var sendEmail_1 = __importDefault(require("../utils/sendEmail"));
var verifyTokenModel_1 = __importDefault(require("../models/verifyTokenModel"));
var dotenv_1 = __importDefault(require("dotenv"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var crypto_1 = __importDefault(require("crypto"));
var JWTService = new jwt_1.default();
dotenv_1.default.config({ path: "../env/config.env" });
var checkLoginPassword = function (loginPassword, registeredPassword) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcrypt_1.default.compare(loginPassword, registeredPassword)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    var _a;
    _a = AuthController;
    AuthController.signup = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, email, password, firstName, lastName, isAdmin, user, newUser, verifyToken, urlMssg, sendUserData;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log(req.body);
                    _b = req.body, email = _b.email, password = _b.password, firstName = _b.firstName, lastName = _b.lastName, isAdmin = _b.isAdmin;
                    return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
                case 1:
                    user = _c.sent();
                    if (user)
                        return [2 /*return*/, next(new appError_1.default("User with this email: ".concat(email, " already exist!"), 400))];
                    return [4 /*yield*/, userModel_1.default.create({
                            email: email,
                            password: password,
                            firstName: firstName,
                            lastName: lastName,
                            isAdmin: isAdmin,
                        })];
                case 2:
                    newUser = _c.sent();
                    return [4 /*yield*/, new verifyTokenModel_1.default({
                            userId: newUser._id,
                            token: crypto_1.default.randomBytes(32).toString("hex"),
                        }).save()];
                case 3:
                    verifyToken = _c.sent();
                    urlMssg = "http://localhost:3000/api/v1/users/".concat(newUser._id, "/verify/").concat(verifyToken.token);
                    (0, sendEmail_1.default)(newUser, urlMssg);
                    sendUserData = {
                        email: newUser.email,
                        firstName: newUser.firstName,
                        isAdmin: newUser.isAdmin,
                    };
                    res.status(201).json({
                        status: "success",
                        // data: sendUserData,
                        message: "user created succefuly!",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    AuthController.login = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, email, password, user, _c, token;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = req.body, email = _b.email, password = _b.password;
                    console.log(req.body);
                    if (!email || !password)
                        return [2 /*return*/, next(new appError_1.default("Please provide email and password", 400))];
                    return [4 /*yield*/, userModel_1.default.findOne({ email: email }).select("+password")];
                case 1:
                    user = _d.sent();
                    _c = !user;
                    if (_c) return [3 /*break*/, 3];
                    return [4 /*yield*/, checkLoginPassword(password, user.password)];
                case 2:
                    _c = !(_d.sent());
                    _d.label = 3;
                case 3:
                    if (_c)
                        return [2 /*return*/, next(new appError_1.default("Please provide valid credentials!", 400))];
                    token = JWTService.signToken(user.id);
                    res.status(200).json({
                        status: "success",
                        message: "logged in successfully!",
                        token: token,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    AuthController.protectRoutes = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var authorization, token, decodedToken, freshUser;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    authorization = req.headers.authorization;
                    if (!authorization) {
                        return [2 /*return*/, next(new appError_1.default("you are not authorized, sign up!", 401))];
                    }
                    token = authorization.split(" ")[1];
                    if (!token)
                        return [2 /*return*/, next(new appError_1.default("Not authorized, please provide a valid token", 401))];
                    decodedToken = JWTService.verifyToken(token, process.env.JWT_SECRET_KEY);
                    return [4 /*yield*/, userModel_1.default.findById(decodedToken.id)];
                case 1:
                    freshUser = _b.sent();
                    if (!freshUser)
                        return [2 /*return*/, next(new appError_1.default("Invalid token provided", 401))];
                    req.user = freshUser;
                    next();
                    return [2 /*return*/];
            }
        });
    }); });
    AuthController.checkAdmin = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            if (!req.user.isAdmin)
                return [2 /*return*/, next(new appError_1.default("you are logged in but do not have permission to access this route", 401))];
            next();
            return [2 /*return*/];
        });
    }); });
    return AuthController;
}());
exports.default = AuthController;
// console.log(process.env.JWT_EXPIRATION_DATE);
// console.log(process.env.NODE_ENV);
