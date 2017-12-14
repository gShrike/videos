"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const getOne = (id) => {
    return connection_1.default('user').where({ id }).first();
};
const getOneByEmail = (email) => {
    return connection_1.default('user').where({ email }).first();
};
const addOne = (name, email, isAdmin = false) => {
    return connection_1.default('user').insert({ name, email, isAdmin }).returning('*');
};
const makeAdmin = (email) => {
    return connection_1.default('user').where({ email }).update({ isAdmin: true }).returning('*');
};
exports.default = {
    getOne,
    getOneByEmail,
    addOne,
    makeAdmin
};
