import express, { Request, Response, Application, NextFunction } from "express";

const asyncHandler: Function = (fn: Function) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler
