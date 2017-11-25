"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = function (knex) {
    return knex.raw('DELETE FROM tag; ALTER SEQUENCE tag_id_seq RESTART WITH 3;')
        .then(function () {
        return knex("tag").insert([
            { id: 1, name: "Express" },
            { id: 2, name: "JavaScript" },
        ]);
    });
};
