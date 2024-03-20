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
var listUsers = {
    tags: ["User"],
    description: "Return a list of all users in the database",
    responses: {
        200: {
            description: "Successful operation",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            count: { type: "integer" },
                            users: { type: "array", items: { type: "string" } },
                        },
                        example: {
                            count: 0,
                            users: [],
                        },
                    },
                },
            },
        },
    },
};
var getOneUser = {
    tags: ["User"],
    description: "Return a user with a given ID",
    responses: {
        200: {
            description: "Successful operation",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            firstName: { type: "string" },
                            lastName: { type: "string" },
                            email: { type: "string" },
                            password: { type: "string" },
                            isAdmin: { type: "boolean" },
                        },
                        example: {
                            firstName: "example_user",
                            lastName: "example_user",
                            email: "user@example.com",
                            password: "hashedpassword",
                            isAdim: true,
                        },
                    },
                },
            },
        },
    },
};
var createUser = {
    tags: ["User"],
    description: "Create a new user",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string",
                            minLength: 3,
                            maxLength: 255,
                        },
                        lastName: {
                            type: "string",
                            minLength: 3,
                            maxLength: 255,
                        },
                        email: {
                            type: "string",
                            maxLength: 100,
                        },
                        password: {
                            type: "string",
                            minLength: 8,
                            maxLength: 255,
                        },
                        isAdmin: {
                            type: "boolean",
                            maxLength: 20,
                            default: false,
                        },
                    },
                    required: ["firstName", "lastName", "email", "password"],
                },
            },
        },
    },
    responses: {
        "201": {
            description: "User created successfully",
        },
    },
};
var putUser = {
    tags: ["User"],
    description: "Update an existing user",
    parameters: [
        {
            name: "userId",
            in: "path",
            description: "ID of the user to update",
            required: true,
            schema: {
                type: "string",
            },
        },
    ],
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        firstName: {
                            type: "string",
                            minLength: 3,
                            maxLength: 255,
                        },
                        lastName: {
                            type: "string",
                            minLength: 3,
                            maxLength: 255,
                        },
                        email: {
                            type: "string",
                            maxLength: 100,
                        },
                        password: {
                            type: "string",
                            minLength: 8,
                            maxLength: 255,
                        },
                        isAdmin: {
                            type: "boolean",
                            default: false,
                            maxLength: 20,
                        },
                    },
                },
            },
        },
    },
    responses: {
        "200": {
            description: "User updated successfully",
        },
        "404": {
            description: "User not found",
        },
    },
};
var deleteUser = {
    tags: ["User"],
    description: "Delete an existing user",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "ID of the user to delete",
            required: true,
            schema: {
                type: "string",
            },
        },
    ],
    responses: {
        "204": {
            description: "User deleted successfully",
        },
        "404": {
            description: "User not found",
        },
    },
};
var UserDocs = {
    "/api/users": {
        get: __assign({ summary: "Get a list of all users" }, listUsers),
        post: __assign({ summary: "Create a new user" }, createUser),
    },
    "/api/users/{id}": {
        get: __assign({ summary: "Get user by ID" }, getOneUser),
        put: __assign({ summary: "Update an existing user" }, putUser),
        delete: __assign({ summary: "Delete an existing user" }, deleteUser),
    },
};
exports.default = UserDocs;
