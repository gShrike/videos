import knex from './connection'
import Tag from './Tag.model'

const getAll = (): Tag[] => {
  return knex('tag').select()
}

const getOne = async (id: number) => {
  const tag: any[] = await knex('tag').select().where('id', id)
  return tag[0]
}

const getOneByName = async (name: string) => {
  const tag: any[] = await knex('tag').select().where('name', name)
  return tag[0]
}

const add = async (tag: any) => {
  const result: any[] = await knex('tag').insert(tag).returning('*')
  return result[0]
}

const edit = async (id: number, tag: any) => {
  const result: any[] = await knex('tag').update(tag).where('id', id).returning('*')
  return result[0]
}

const remove = (id: number) => {
  return knex('tag').del().where('id', id)
}

export default {
  getAll,
  getOne,
  getOneByName,
  add,
  edit,
  remove
}
