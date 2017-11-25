import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
  return knex.schema.createTable('tag', (table) => {
    table.increments()
    table.text('name').notNullable()
  })
};

exports.down = function (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('tag')
};
