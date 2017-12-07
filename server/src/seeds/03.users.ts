import * as Knex from "knex";

exports.seed = function (knex: Knex): Promise<any> {
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 2;')
        .then(function () {
            return knex('user').insert([
                { id: 1, name: 'Roberto Ortega', email: 'berto.ort@gmail.com', isAdmin: true },
            ]);
        });
};
