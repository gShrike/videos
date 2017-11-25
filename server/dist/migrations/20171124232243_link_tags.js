"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable('link_tags', (table) => {
        table.increments();
        table.integer('link_id').unsigned().references('link.id').onDelete('cascade');
        table.integer('tag_id').unsigned().references('tag.id').onDelete('cascade');
    });
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('link_tags');
};
