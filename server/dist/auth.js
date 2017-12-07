"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passport_github2_1 = require("passport-github2");
const handleUser = function (user, done) {
    done(null, user);
};
const createToken = function (data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' });
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
const getUser = function (req) {
    const authorization = req.get('Authorization');
    if (authorization) {
        const token = authorization.substring(7);
        return jwt.verify(token, process.env.TOKEN_SECRET);
    }
};
const validateAdmin = function (req, res, next) {
    const user = getUser(req);
    if (user) {
        user.isAdmin ? next() : res.json({ error: 'Unauthorized' });
    }
    else {
        res.json({ error: 'Unauthorized' });
    }
};
const validateUser = function (req, res, next) {
    const authorization = req.get('Authorization');
    if (authorization) {
        const token = authorization.substring(7);
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        decoded ? next() : res.json({ error: 'Unauthorized' });
    }
    else {
        res.json({ error: 'Unauthorized' });
    }
};
exports.default = {
    passport,
    createToken,
    validateAdmin,
    getUser,
    validateUser
};
