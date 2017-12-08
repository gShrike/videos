import knex from './connection'

const getOne = (id: number) => {
  return knex('user').where({ id }).first()
}

const getOneByEmail = (email: string) => {
  return knex('user').where({ email }).first()
}

const addOne = (name: string, email: string, isAdmin: boolean = false) => {
  return knex('user').insert({ name, email, isAdmin }).returning('*')
}

const makeAdmin = (email: string) => {
  return knex('user').where({ email }).update({ isAdmin: true })
}

export default {
  getOne,
  getOneByEmail,
  addOne,
  makeAdmin
}
