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
const express_1 = require("express");
const link_queries_1 = require("../db/link.queries");
class LinkRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = yield link_queries_1.default.getAll();
            res.json({ message: 'Success', links });
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const link = yield link_queries_1.default.getOne(id);
            if (link) {
                res.json({ message: 'Success', link });
            }
            else {
                res.json({ message: 'No link found with the given id.' });
            }
        });
    }
    add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.url && typeof req.body.url === 'string') {
                const link = yield link_queries_1.default.add(req.body);
                res.json({ message: 'Success', link });
            }
            else {
                res.json({ message: 'URL is required to add a link' });
            }
        });
    }
    addTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const tag = req.body.tag;
            try {
                yield link_queries_1.default.addTag(id, tag);
                res.json({ message: 'Success' });
            }
            catch (error) {
                res.json({ message: 'Unable to add tag.', error });
            }
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const link = yield link_queries_1.default.edit(id, req.body);
            res.json({ message: 'Success', link });
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                yield link_queries_1.default.remove(id);
                res.json({ message: 'Success' });
            }
            catch (error) {
                res.json({ message: 'No link found with the given id.', error });
            }
        });
    }
    removeTag(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const tag_id = req.params.tag_id;
            try {
                yield link_queries_1.default.removeTag(id, tag_id);
                res.json({ message: 'Success' });
            }
            catch (error) {
                res.json({ message: 'Unable to remove tag.', error });
            }
        });
    }
    removeTags(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield link_queries_1.default.removeTags(id);
                res.json({ message: 'Success' });
            }
            catch (error) {
                res.json({ message: 'Unable to remove tags.', error });
            }
        });
    }
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.add);
        this.router.post('/:id/tags', this.addTag);
        this.router.put('/:id', this.edit);
        this.router.delete('/:id', this.remove);
        this.router.delete('/:id/tags', this.removeTags);
        this.router.delete('/:id/tags/:tag_id', this.removeTag);
    }
}
exports.LinkRouter = LinkRouter;
const linkRoutes = new LinkRouter();
linkRoutes.init();
exports.default = linkRoutes.router;
