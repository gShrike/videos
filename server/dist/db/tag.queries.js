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
const getAll = () => {
    return connection_1.default('tag').select();
};
const getOne = (id) => __awaiter(this, void 0, void 0, function* () {
    const tag = yield connection_1.default('tag').select().where('id', id);
    return tag[0];
});
const getOneByName = (name) => __awaiter(this, void 0, void 0, function* () {
    const tag = yield connection_1.default('tag').select().where('name', name);
    return tag[0];
});
const add = (tag) => __awaiter(this, void 0, void 0, function* () {
    const result = yield connection_1.default('tag').insert(tag).returning('*');
    return result[0];
});
const edit = (id, tag) => __awaiter(this, void 0, void 0, function* () {
    const result = yield connection_1.default('tag').update(tag).where('id', id).returning('*');
    return result[0];
});
const remove = (id) => {
    return connection_1.default('tag').del().where('id', id);
};
exports.default = {
    getAll,
    getOne,
    getOneByName,
    add,
    edit,
    remove
};
