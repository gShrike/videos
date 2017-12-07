import knex from './connection'

const getOne = (user_id: number, link_id: number) => {
  return knex('rating').where({ user_id, link_id }).first()
}

const getAllByUser = (user_id: number) => {
  return knex('rating').where({ user_id })
}

const getAllByLink = (link_id: number) => {
  return knex('rating').where({ link_id })
}

const setRating = (rating: number, user_id: number, link_id: number) => {
  return knex('rating').select().where({ user_id, link_id })
    .then((ratings) => {
      if (ratings.length > 0) {
        return knex('rating')
          .where({ user_id, link_id })
          .update({ rating })
      } else {
        return knex('rating').insert({ rating, user_id, link_id })
      }
    })
}

export default {
  getOne,
  getAllByUser,
  getAllByLink,
  setRating
}
