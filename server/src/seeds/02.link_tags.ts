import * as Knex from "knex";

exports.seed = function (knex: Knex): Promise<any> {
    return knex.raw('DELETE FROM link_tags; ALTER SEQUENCE link_tags_id_seq RESTART WITH 4;')
        .then(function () {
            return knex("link_tags").insert([
                { id: 1, link_id: 1, tag_id: 1 },
                { id: 2, link_id: 1, tag_id: 2 },
                { id: 3, link_id: 2, tag_id: 2 }
            ]);
        });
};
