import * as Knex from "knex";

const up = function (knex: Knex): Promise<any> {
  return knex.schema.createTable('link', (table) => {
    table.increments()
    table.text('url').notNullable()
    table.text('title').notNullable()
  })
};

const down = function (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('link')
};

export {up, down}
