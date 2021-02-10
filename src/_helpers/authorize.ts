import jwt from 'express-jwt'
import { secret } from '../config/config'
import { NextFunction, Request, Response } from 'express'

export const Authorize = (roles: any = []) => {
    if (typeof roles === 'string') {
        roles = [roles]
    }

    return [
        jwt({ secret, algorithms: ['HS256'] }),

        (req: Request, res: Response, next: NextFunction) => {
            if (roles.length && !roles.includes(req.body.role)) {
                return res.status(401).json({ message: 'Unauthorized' })
            }
            next()
        }

    ]
}



