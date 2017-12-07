"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = function (knex) {
    return knex.raw('DELETE FROM rating; ALTER SEQUENCE rating_id_seq RESTART WITH 2;')
        .then(function () {
        return knex("rating").insert([
            { id: 1, rating: 3, user_id: 1, link_id: 1 },
        ]);
    });
};
