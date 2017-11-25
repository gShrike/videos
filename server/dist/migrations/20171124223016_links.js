"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const up = function (knex) {
    return knex.schema.createTable('link', (table) => {
        table.increments();
        table.text('url').notNullable();
        table.text('title').notNullable();
    });
};
exports.up = up;
const down = function (knex) {
    return knex.schema.dropTableIfExists('link');
};
exports.down = down;
