import knex from './connection'
import Link from './Link.model'
import Tag from './Tag.model'
import tagQueries from './tag.queries'

const getOne = async (id: number) => {
  const link: any = await knex('link').select().where('id', id).first()
  const linkTags: any = await knex('link_tags').select().where('link_id', id)
  const tagRequests: Promise<Tag>[] = linkTags.map((linkTag: any) => {
    return knex('tag').select().where('id', linkTag.tag_id).first()
  })
  link.tags = await Promise.all(tagRequests)
  return link
}

const getAll = async () => {
  const links: Link[] = await  knex('link').select()
  const linkRequests: Promise<any>[] = links.map((link: Link) => {
    return getOne(link.id) 
  })
  return await Promise.all(linkRequests)
}

const add = async (link: any) => {
  const result: any[] = await knex('link').insert(link).returning('*')
  return result[0]
}

const addTag = async (link_id: number, tag_name: string) => {
  let tag: Tag = await tagQueries.getOneByName(tag_name)
  if (!tag) {
    tag = await tagQueries.add({name: tag_name})
  }
  return knex('link_tags').insert({link_id, tag_id: tag.id})
}

const edit = async (id: number, link: any) => {
  const result: any[] = await knex('link').update(link).where('id', id).returning('*')
  return result[0]
}

const remove = (id: number) => {
  return knex('link').del().where('id', id)
}

const removeTag = (link_id: number, tag_id: number) => {
  return knex('link_tags').del().where({link_id, tag_id})
}

export default {
  getAll,
  getOne,
  add,
  addTag,
  edit,
  remove,
  removeTag
}
