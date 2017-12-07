"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments();
        table.text('name').notNullable();
        table.text('email').notNullable();
        table.boolean('isAdmin').defaultTo(false);
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user');
};
