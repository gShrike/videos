"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable('tag', (table) => {
        table.increments();
        table.text('name').notNullable();
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tag');
};
