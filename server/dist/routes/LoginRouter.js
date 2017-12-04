"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth");
const jwt = require("jsonwebtoken");
const createToken = function (payload) {
    const data = { name: payload.profile.displayName, email: payload.profile.email };
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};
class LoginRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    gitCallback(req, res, next) {
        auth_1.default.authenticate('github', function (error, payload) {
            if (error) {
                res.redirect(`${process.env.CLIENT_URL}/login`);
            }
            else {
                const token = createToken(payload);
                res.redirect(`${process.env.CLIENT_URL}/token?token=${token}`);
            }
        })(req, res, next);
    }
    login(req, res, next) {
        if (req.body.name === process.env.ADMIN_NAME && req.body.password === process.env.ADMIN_PASSWORD) {
            const token = createToken({ profile: { name: 'Berto Ortega', email: 'roberto.ortega@galvanize.com' } });
            res.redirect(`${process.env.CLIENT_URL}/token?token=${token}`);
        }
        else {
            res.redirect(`${process.env.CLIENT_URL}/login?error=invalid`);
        }
    }
    validate(req, res, next) {
        const token = jwt.verify(req.query.token, process.env.TOKEN_SECRET);
        let valid = false;
        if (token) {
            valid = true;
        }
        res.json({ valid });
    }
    init() {
        this.router.get('/github', auth_1.default.authenticate('github', { scope: ['user:email'] }));
        this.router.get('/github/callback', this.gitCallback);
        this.router.get('/validate', this.validate);
        this.router.post('/', this.login);
    }
}
exports.LoginRouter = LoginRouter;
const loginRoutes = new LoginRouter();
loginRoutes.init();
exports.default = loginRoutes.router;
