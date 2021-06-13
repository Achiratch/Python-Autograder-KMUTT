"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { options } = require('../routes/api/users');
const User_1 = __importDefault(require("../models/User"));
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = `${process.env.SECRET}`;
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User_1.default.findById(jwt_payload.id)
            .then((user) => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch((err) => console.log(err));
    }));
};
