import knex from './connection'
import Link from './Link.model'

const getAll = (): Link[] => {
  return knex('link').select()
}

const getOne = async (id: number) => {
  const link = await knex('link').select().where('id', id)
  return link[0]
}

const add = async (link: any) => {
  const result = await knex('link').insert(link).returning('*')
  return result[0]
}

const edit = async (id: number, link: any) => {
  const result = await knex('link').update(link).where('id', id).returning('*')
  return result[0]
}

const remove = (id: number) => {
  return knex('link').del().where('id', id)
}

export default {
  getAll,
  getOne,
  add,
  edit,
  remove
}
