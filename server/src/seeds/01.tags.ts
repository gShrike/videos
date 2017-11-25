import * as Knex from "knex";

exports.seed = function (knex: Knex): Promise<any> {
    return knex.raw('DELETE FROM tag; ALTER SEQUENCE tag_id_seq RESTART WITH 3;')
        .then(function () {
            return knex("tag").insert([
                { id: 1, name: "Express" },
                { id: 2, name: "JavaScript" },
            ]);
        });
};
