import { NextFunction, Request, Response, } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(err.statusCode || 500)
    res.json({
        success: false,
        error: err.message || 'Server Error'
    })
}