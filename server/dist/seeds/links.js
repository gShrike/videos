"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = function (knex) {
    return knex.raw('DELETE FROM link; ALTER SEQUENCE link_id_seq RESTART WITH 3;')
        .then(function () {
        return knex("link").insert([
            { id: 1, url: "https://www.youtube.com/watch?v=jJFd05_CjUY" },
            { id: 2, url: "https://www.youtube.com/watch?v=YSFIP0HsR7I" },
        ]);
    });
};
