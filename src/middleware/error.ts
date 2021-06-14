import { NextFunction, Request, Response, } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500)
    res.json({
        success: false,
        error: err.message || 'Server Error'
    })
}