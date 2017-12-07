"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const getByUser = (user_id) => {
    return connection_1.default('rating').where({ user_id });
};
const getByLink = (link_id) => {
    return connection_1.default('rating').where({ link_id });
};
const setRating = (rating, user_id, link_id) => {
    return connection_1.default('rating').where({ user_id, link_id })
        .then((ratings) => {
        if (ratings.length > 0) {
            return connection_1.default('rating')
                .where({ user_id, link_id })
                .update({ rating });
        }
        else {
            return connection_1.default('rating').insert({ rating, user_id, link_id });
        }
    });
};
exports.default = {
    getByUser,
    getByLink,
    setRating
};
