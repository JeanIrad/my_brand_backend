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
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var appError_1 = __importDefault(require("../utils/appError"));
var messageModel_1 = __importDefault(require("./../models/messageModel"));
var sendEmailResponses_1 = __importDefault(require("../middleware/sendEmailResponses"));
var MessageController = /** @class */ (function () {
    function MessageController() {
    }
    var _a;
    _a = MessageController;
    MessageController.getAllMessages = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var messages;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, messageModel_1.default.find({}, { __v: false })];
                case 1:
                    messages = _b.sent();
                    if (!messages)
                        return [2 /*return*/, next(new appError_1.default("no message found", 404))];
                    res.status(200).json({
                        status: "success",
                        size: messages.length,
                        data: messages,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    MessageController.createMessage = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var newmessage;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, messageModel_1.default.create(req.body)];
                case 1:
                    newmessage = _b.sent();
                    res.status(201).json({
                        status: "success",
                        data: newmessage,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    MessageController.updateMessage = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, message;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, messageModel_1.default.findByIdAndUpdate(id, req.body, {
                            new: true,
                            runValidators: true,
                        })];
                case 1:
                    message = _b.sent();
                    if (!message) {
                        return [2 /*return*/, next(new appError_1.default("No message Found with id ".concat(id), 404))];
                    }
                    res.status(201).json({
                        status: "success",
                        data: message,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    MessageController.deleteMessage = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var message;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, messageModel_1.default.findByIdAndDelete(req.params.id)];
                case 1:
                    message = _b.sent();
                    if (!message) {
                        return [2 /*return*/, next(new appError_1.default("No message found with Id ".concat(req.params.id), 404))];
                    }
                    res.status(200).json({
                        status: "success",
                        message: "deleted",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    MessageController.getMessage = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, message;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, messageModel_1.default.findById(id)];
                case 1:
                    message = _b.sent();
                    if (!message) {
                        return [2 /*return*/, next(new appError_1.default("No message found with the id ".concat(id), 404))];
                    }
                    res.status(200).json({
                        status: "success",
                        message: message,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    MessageController.sendResponse = function (req, res, next) {
        var _b = req.body, name = _b.name, reason = _b.reason, content = _b.content, email = _b.email;
        console.log(req.body);
        if (!name || !reason || !content || !email)
            return next(new appError_1.default("Please provide all the required fields", 400));
        (0, sendEmailResponses_1.default)(name, reason, content, email);
        res.status(200).json({
            status: "success",
            message: "response sent successfully",
        });
    };
    return MessageController;
}());
exports.default = MessageController;
