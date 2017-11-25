import {Router, Request, Response, NextFunction} from 'express'
import Tag from '../db/Tag.model'
import tagQueries from '../db/tag.queries'

export class TagRouter {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    const tags: Tag[] = await tagQueries.getAll()
    res.json({ message: 'Success', tags })
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    let id: number = parseInt(req.params.id)
    const tag: Tag = await tagQueries.getOne(id) 
    if (tag) {
      res.json({ message: 'Success', tag })
    } else {
      res.json({ message: 'No tag found with the given id.' })
    }
  }

  public async add(req: Request, res: Response, next: NextFunction) {
    if (req.body.name && typeof req.body.name === 'string') {
      const tag = await tagQueries.add(req.body)
      res.json({ message: 'Success', tag })
    } else {
      res.json({ message: 'Name is required to add a tag' })
    }
  }

  public async edit(req: Request, res: Response, next: NextFunction) {
    let id: number = parseInt(req.params.id)
    const tag: Tag = await tagQueries.edit(id, req.body)
    res.json({ message: 'Success', tag })
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    let id: number = parseInt(req.params.id)
    try {
      await tagQueries.remove(id) 
      res.json({ message: 'Success'})
    } catch(error) {
      res.json({ message: 'No tag found with the given id.', error })
    }
  }

  init() {
    this.router.get('/', this.getAll)
    this.router.get('/:id', this.getOne)
    this.router.post('/', this.add)
    this.router.put('/:id', this.edit)
    this.router.delete('/:id', this.remove)
  }

}

const tagRoutes = new TagRouter()
tagRoutes.init()

export default tagRoutes.router
