"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const tag_queries_1 = require("./tag.queries");
const getOne = (id) => __awaiter(this, void 0, void 0, function* () {
    const link = yield connection_1.default('link').select().where('id', id).orderBy('title', 'asc').first();
    const linkTags = yield connection_1.default('link_tags').select().where('link_id', id);
    const tagRequests = linkTags.map((linkTag) => {
        return connection_1.default('tag').select().where('id', linkTag.tag_id).first();
    });
    link.tags = yield Promise.all(tagRequests);
    return link;
});
const getAll = () => __awaiter(this, void 0, void 0, function* () {
    const links = yield connection_1.default('link').select();
    const linkRequests = links.map((link) => {
        return getOne(link.id);
    });
    return yield Promise.all(linkRequests);
});
const add = (link) => __awaiter(this, void 0, void 0, function* () {
    const result = yield connection_1.default('link').insert(link).returning('*');
    return result[0];
});
const addTag = (link_id, tag_name) => __awaiter(this, void 0, void 0, function* () {
    let tag = yield tag_queries_1.default.getOneByName(tag_name);
    if (!tag) {
        tag = yield tag_queries_1.default.add({ name: tag_name });
    }
    return connection_1.default('link_tags').insert({ link_id, tag_id: tag.id });
});
const edit = (id, link) => __awaiter(this, void 0, void 0, function* () {
    const result = yield connection_1.default('link').update(link).where('id', id).returning('*');
    return result[0];
});
const remove = (id) => {
    return connection_1.default('link').del().where('id', id);
};
const removeTag = (link_id, tag_id) => {
    return connection_1.default('link_tags').del().where({ link_id, tag_id });
};
const removeTags = (link_id) => {
    return connection_1.default('link_tags').del().where({ link_id });
};
exports.default = {
    getAll,
    getOne,
    add,
    addTag,
    edit,
    remove,
    removeTags,
    removeTag
};
