"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passport_github2_1 = require("passport-github2");
const handleUser = function (user, done) {
    done(null, user);
};
const adminEmails = ['berto.ort@gmail.com'];
const createToken = function (payload) {
    const data = { name: payload.profile.displayName, email: payload.profile.email };
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};
const isAdmin = function (enteredEmail) {
    return adminEmails.some(email => email === enteredEmail);
};
passport.serializeUser(handleUser);
passport.deserializeUser(handleUser);
passport.use(new passport_github2_1.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.HOST}/login/github/callback`,
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        done(null, { profile, token: accessToken });
    });
}));
exports.default = {
    passport,
    isAdmin,
    createToken
};
