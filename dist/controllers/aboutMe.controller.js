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
var appError_1 = __importDefault(require("../utils/appError"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var aboutMeModel_1 = require("../models/aboutMeModel");
var AboutMeController = /** @class */ (function () {
    function AboutMeController() {
    }
    var _a;
    _a = AboutMeController;
    AboutMeController.getAboutMe = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var aboutMe;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, aboutMeModel_1.AboutMe.find({}, { __v: false })];
                case 1:
                    aboutMe = _b.sent();
                    if (!aboutMe)
                        return [2 /*return*/, next(new appError_1.default("No about me found yet", 404))];
                    res.status(200).json({
                        status: "success",
                        aboutMe: aboutMe,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    AboutMeController.createAboutMe = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var aboutMe;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, aboutMeModel_1.AboutMe.create(req.body)];
                case 1:
                    aboutMe = _b.sent();
                    res.status(200).json({
                        status: "success",
                        aboutMe: aboutMe,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    AboutMeController.updateAboutMe = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var about, updatedAbout;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, aboutMeModel_1.AboutMe.findById(req.params.id)];
                case 1:
                    about = _b.sent();
                    if (!about)
                        return [2 /*return*/, next(new appError_1.default("No about me found", 404))];
                    return [4 /*yield*/, aboutMeModel_1.AboutMe.findByIdAndUpdate(req.params.id, req.body, {
                            new: true,
                            runValidators: true,
                        })];
                case 2:
                    updatedAbout = _b.sent();
                    res.status(200).json({
                        status: "sucess",
                        updatedAbout: updatedAbout,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    AboutMeController.deleteAboutMe = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var about;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, aboutMeModel_1.AboutMe.findById(req.params.id)];
                case 1:
                    about = _b.sent();
                    if (!about)
                        return [2 /*return*/, next(new appError_1.default("No about found with that id", 404))];
                    return [4 /*yield*/, aboutMeModel_1.AboutMe.findByIdAndDelete(req.params.id)];
                case 2:
                    _b.sent();
                    res.status(204).json({
                        status: "success",
                        message: "deleted",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    return AboutMeController;
}());
exports.default = AboutMeController;
