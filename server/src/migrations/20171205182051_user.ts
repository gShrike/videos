import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
  return knex.schema.createTable('user', (table) => {
    table.increments()
    table.text('name').notNullable()
    table.text('email').notNullable()
    table.boolean('isAdmin').defaultTo(false)
  })
};

exports.down = function (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('user')
};
