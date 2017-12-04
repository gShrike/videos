"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_github2_1 = require("passport-github2");
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
function handleUser(user, done) {
    done(null, user);
}
exports.default = passport;
