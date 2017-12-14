"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth");
const user_queries_1 = require("../db/user.queries");
const jwt = require("jsonwebtoken");
class LoginRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    gitCallback(req, res, next) {
        auth_1.default.passport.authenticate('github', function (error, payload) {
            return __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    res.redirect(`${process.env.CLIENT_URL}/login`);
                }
                else {
                    let user = getGithubUser(payload.profile);
                    const dbUser = yield user_queries_1.default.getOneByEmail(user.email);
                    if (!dbUser) {
                        const newUser = yield user_queries_1.default.addOne(user.name, user.email);
                        user = newUser[0];
                    }
                    else {
                        user = dbUser;
                    }
                    const token = auth_1.default.createToken(Object.assign({}, user));
                    res.redirect(`${process.env.CLIENT_URL}/token?token=${token}`);
                }
            });
        })(req, res, next);
    }
    login(req, res, next) {
        if (req.body.name === process.env.ADMIN_NAME && req.body.password === process.env.ADMIN_PASSWORD) {
            const token = auth_1.default.createToken({ id: 1, name: 'Berto Ortega', email: 'roberto.ortega@galvanize.com', isAdmin: true });
            res.redirect(`${process.env.CLIENT_URL}/token?token=${token}`);
        }
        else {
            res.redirect(`${process.env.CLIENT_URL}/login?error=invalid`);
        }
    }
    validate(req, res, next) {
        try {
            const token = jwt.verify(req.query.token, process.env.TOKEN_SECRET);
            res.json({ valid: true });
        }
        catch (error) {
            res.json({ valid: false, error });
        }
    }
    adminize(req, res, next) {
        const email = req.query.email;
        if (email && req.query.password === process.env.ADMIN_PASSWORD) {
            user_queries_1.default.makeAdmin(email).then(() => res.json({ message: `${email} is now admin` }));
        }
        else {
            res.json({ error: 'Invalid Email or Password' });
        }
    }
    init() {
        this.router.get('/github', auth_1.default.passport.authenticate('github', { scope: ['user:email'] }));
        this.router.get('/github/callback', this.gitCallback);
        this.router.get('/validate', this.validate);
        this.router.get('/adminize', this.adminize);
        this.router.post('/', this.login);
    }
}
exports.LoginRouter = LoginRouter;
function getGithubUser(profile) {
    let email = profile.username;
    if (profile.emails && profile.emails[0]) {
        email = profile.emails[0].value;
    }
    const name = profile.displayName ? profile.displayName : profile.username;
    return { name, email };
}
const loginRoutes = new LoginRouter();
loginRoutes.init();
exports.default = loginRoutes.router;
