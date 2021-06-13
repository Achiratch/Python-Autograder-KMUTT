"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500);
    res.json({
        success: false,
        error: err.message || 'Server Error'
    });
};
exports.errorHandler = errorHandler;
