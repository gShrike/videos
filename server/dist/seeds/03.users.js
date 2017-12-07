"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = function (knex) {
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 2;')
        .then(function () {
        return knex('user').insert([
            { id: 1, name: 'Roberto Ortega', email: 'berto.ortega@gmail.com', isAdmin: true },
        ]);
    });
};
