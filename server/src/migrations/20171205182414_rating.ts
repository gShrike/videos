import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
  return knex.schema.createTable('rating', (table) => {
    table.increments();
    table.integer('rating');
    table.integer('user_id').unsigned().references('user.id').onDelete('cascade');
    table.integer('link_id').unsigned().references('link.id').onDelete('cascade');
  })
};

exports.down = function (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('rating')
};
