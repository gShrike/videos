"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable('rating', (table) => {
        table.increments();
        table.integer('rating');
        table.integer('user_id').unsigned().references('user.id').onDelete('cascade');
        table.integer('link_id').unsigned().references('link.id').onDelete('cascade');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('rating');
};
