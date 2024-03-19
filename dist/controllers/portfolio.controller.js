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
var cloudinary_1 = __importDefault(require("../utils/cloudinary"));
var portfolioModel_1 = require("../models/portfolioModel");
var PortfolioController = /** @class */ (function () {
    function PortfolioController() {
    }
    var _a;
    _a = PortfolioController;
    PortfolioController.getAllPortfolios = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var portfolios;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, portfolioModel_1.Portfolio.find({}, { __v: false })];
                case 1:
                    portfolios = _b.sent();
                    if (!portfolios)
                        return [2 /*return*/, next(new appError_1.default("no portfolio found", 404))];
                    res.status(200).json({
                        status: "success",
                        size: portfolios.length,
                        portfolios: portfolios,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    PortfolioController.createPortfolio = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, name, createdBy, imageUpload, newPortfolio_1, newPortfolio;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, name = _b.name, createdBy = _b.createdBy;
                    if (!req.file) return [3 /*break*/, 3];
                    return [4 /*yield*/, cloudinary_1.default.uploader.upload(req.file.path)];
                case 1:
                    imageUpload = _c.sent();
                    newPortfolio_1 = new portfolioModel_1.Portfolio({
                        name: name,
                        createdBy: createdBy,
                        imageUrl: imageUpload.secure_url,
                    });
                    return [4 /*yield*/, newPortfolio_1.save()];
                case 2:
                    _c.sent();
                    res.status(201).json({
                        status: "success",
                        newPortfolio: newPortfolio_1,
                    });
                    _c.label = 3;
                case 3: return [4 /*yield*/, portfolioModel_1.Portfolio.create({ name: name, createdBy: createdBy })];
                case 4:
                    newPortfolio = _c.sent();
                    res.status(201).json({
                        status: "success",
                        newPortfolio: newPortfolio,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    PortfolioController.updatePortfolio = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var portfolio, updatedPortfolio;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, portfolioModel_1.Portfolio.findOne({ _id: req.params.id })];
                case 1:
                    portfolio = _b.sent();
                    if (!portfolio)
                        return [2 /*return*/, next(new appError_1.default("no portfolio found", 404))];
                    return [4 /*yield*/, portfolioModel_1.Portfolio.findByIdAndUpdate(req.params.id, req.body, {
                            new: true,
                            runValidators: true,
                        })];
                case 2:
                    updatedPortfolio = _b.sent();
                    res.status(200).json({
                        status: "success",
                        updatedPortfolio: updatedPortfolio,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    PortfolioController.getPortfolio = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var portfolio;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, portfolioModel_1.Portfolio.findById(req.params.id)];
                case 1:
                    portfolio = _b.sent();
                    if (!portfolio)
                        return [2 /*return*/, next(new appError_1.default("No portfolio found", 404))];
                    res.status(200).json({
                        status: "success",
                        portfolio: portfolio,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    PortfolioController.deletePortfolio = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var portfolio;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, portfolioModel_1.Portfolio.findById(req.params.id)];
                case 1:
                    portfolio = _b.sent();
                    if (!portfolio)
                        return [2 /*return*/, next(new appError_1.default("No portfolio found", 404))];
                    res.status(204).json({
                        status: "success",
                        message: "deleted",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    return PortfolioController;
}());
exports.default = PortfolioController;
