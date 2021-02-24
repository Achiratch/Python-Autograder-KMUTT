import { secretType } from "express-jwt";
import { VerifyCallback } from "jsonwebtoken";

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const { options } = require('../routes/api/users');

import IUser from '../interfaces/User'


const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `${process.env.SECRET}`;

module.exports = (passport: any) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload: any, done: VerifyCallback | any) => {
            User.findById(jwt_payload.id)
                .then((user: IUser | null) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err: any) => console.log(err));
        })
    );
};