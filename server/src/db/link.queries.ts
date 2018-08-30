import knex from './connection'
import Link from './Link.model'
import Tag from './Tag.model'
import tagQueries from './tag.queries'
import ratingQueries from './rating.queries'

const uniqBy = (list, key) => {
  const seen = {}
  return list.filter(function(item) {
    return seen.hasOwnProperty(item[key]) ? false : (seen[item[key]] = true)
  })
}

const getOne = async (id: number, user: any) => {
  const link: any = await knex('link').select().where('link.id', id).first()
  const linkTags: any = await knex('link_tags').select().where('link_id', id)
  const tagRequests: Promise<Tag>[] = linkTags.map((linkTag: any) => {
    return knex('tag').select().where('id', linkTag.tag_id).first()
  })
  const ratings: any = await knex('rating').select('rating').where('link_id', id)
  if (user) {
    const userRating = await ratingQueries.getOne(user.id, id)
    link.user_rating = userRating ? userRating.rating : 0;
  }
  link.rating = ratings.reduce((total, data) => total + data.rating, 0)
  link.tags = await Promise.all(tagRequests)
  return link
}

const getAll = async (q: string, offset: number, user: any) => {
  let query = knex('link')
    .select('link.id', 'link.title', 'link.url', 'link.created_at')
    .orderBy('title', 'asc')
    .limit(10)
  if (offset && !isNaN(offset)) {
    query = query.offset(offset)
  }
  if (q) {
    query = query.innerJoin('link_tags', 'link.id', 'link_tags.link_id')
      .innerJoin('tag', 'tag.id', 'link_tags.tag_id')
      .where(knex.raw('LOWER("title") LIKE ?', `%${q}%`))
      .orWhere(knex.raw('LOWER("name") LIKE ?', `%${q}%`))
  }
  const links: Link[] = await query 
  if (links.length > 0) {
    const linkRequests: Promise<any>[] = links.map((link: Link) => {
      return getOne(link.id, user) 
    })
    const data = await Promise.all(linkRequests)
    return uniqBy(data, 'id')
  } else {
    return links
  }
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

const removeTags = (link_id: number) => {
  return knex('link_tags').del().where({link_id})
}

export default {
  getAll,
  getOne,
  add,
  addTag,
  edit,
  remove,
  removeTags,
  removeTag
}
