import * as Knex from "knex";

exports.seed = function (knex: Knex): Promise<any> {
    return knex.raw('DELETE FROM rating; ALTER SEQUENCE rating_id_seq RESTART WITH 2;')
        .then(function () {
            return knex("rating").insert([
                { id: 1, rating: 1, user_id: 1, link_id: 1 },
            ]);
        });
};
