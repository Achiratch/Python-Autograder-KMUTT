"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
const config_1 = require("../config/config");
const Authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        express_jwt_1.default({ secret: config_1.secret, algorithms: ['HS256'] }),
        (req, res, next) => {
            if (roles.length && !roles.includes(req.body.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        }
    ];
};
exports.Authorize = Authorize;
