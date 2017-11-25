import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
  return knex.schema.createTable('link_tags', (table) => {
    table.increments()
    table.integer('link_id').unsigned().references('link.id').onDelete('cascade');
    table.integer('tag_id').unsigned().references('tag.id').onDelete('cascade');
  })
};

exports.down = function (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('link_tags')
};
