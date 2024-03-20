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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var blogDocs_1 = __importDefault(require("./blogDocs"));
var userDocs_1 = __importDefault(require("./userDocs"));
var messageDocs_1 = __importDefault(require("./messageDocs"));
var swaggerdocs = {
    openapi: "3.0.1",
    info: {
        title: "My portfolio API documentation",
        version: "1.0.0",
        description: "This is an API for my blog application",
        contact: {
            name: "Jean De Dieu Iradukunda",
            url: "https://JeanIrad.github.io/JeanIrad/",
            email: "jado.milton@gmail.com",
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "apiKey",
                name: "x-auth-token",
                in: "header",
                description: "Bearer token authorization",
            },
        },
    },
    tags: [
        {
            name: "Blog",
            description: "Blog Endpoints",
        },
        {
            name: "User",
            description: "Users Endpoints",
        },
    ],
    paths: __assign(__assign(__assign({}, userDocs_1.default), blogDocs_1.default), messageDocs_1.default),
};
exports.default = swaggerdocs;
