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
    return connection_1.default('link').select();
};
const getOne = (id) => __awaiter(this, void 0, void 0, function* () {
    const link = yield connection_1.default('link').select().where('id', id);
    return link[0];
});
const add = (link) => __awaiter(this, void 0, void 0, function* () {
    const result = yield connection_1.default('link').insert(link).returning('*');
    return result[0];
});
const edit = (id, link) => __awaiter(this, void 0, void 0, function* () {
    const result = yield connection_1.default('link').update(link).where('id', id).returning('*');
    return result[0];
});
const remove = (id) => {
    return connection_1.default('link').del().where('id', id);
};
exports.default = {
    getAll,
    getOne,
    add,
    edit,
    remove
};
