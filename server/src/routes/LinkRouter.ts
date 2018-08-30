import {Router, Request, Response, NextFunction} from 'express'
import Link from '../db/Link.model'
import linkQueries from '../db/link.queries'
import ratingQueries from '../db/rating.queries'
import auth from '../auth'

export class LinkRouter {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    let query = req.query.q ? req.query.q.toLowerCase() : undefined
    const offset = Number(req.query.offset)
    const user = auth.getUser(req)
    const links: Link[] = await linkQueries.getAll(query, offset, user)
    res.json({ message: 'Success', links })
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id)
    const link: Link = await linkQueries.getOne(id, null) 
    if (link) {
      res.json({ message: 'Success', link })
    } else {
      res.json({ message: 'No link found with the given id.' })
    }
  }

  public async add(req: Request, res: Response, next: NextFunction) {
    if (req.body.url && typeof req.body.url === 'string') {
      const link = await linkQueries.add(req.body)
      res.json({ message: 'Success', link })
    } else {
      res.json({ message: 'URL is required to add a link' })
    }
  }

  public async addTag(req: Request, res: Response, next: NextFunction) {
    const id: number = req.params.id
    const tag: string = req.body.tag
    try {
      await linkQueries.addTag(id, tag) 
      res.json({ message: 'Success'})
    } catch(error) {
      res.json({ message: 'Unable to add tag.', error })
    }
  }

  public async edit(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id)
    const link: Link = await linkQueries.edit(id, req.body)
    res.json({ message: 'Success', link })
  }

  public async rate(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id)
    try {
      const result = await ratingQueries.setRating(req.body.rating, req.body.user_id, id)
      res.json({ message: 'Success' })
    } catch(error) {
      res.json({ message: 'Unable to Rate', error })
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id)
    try {
      await linkQueries.remove(id) 
      res.json({ message: 'Success'})
    } catch(error) {
      res.json({ message: 'No link found with the given id.', error })
    }
  }

  public async removeTag(req: Request, res: Response, next: NextFunction) {
    const id: number = req.params.id
    const tag_id: number = req.params.tag_id
    try {
      await linkQueries.removeTag(id, tag_id) 
      res.json({ message: 'Success'})
    } catch(error) {
      res.json({ message: 'Unable to remove tag.', error })
    }
  }

  public async removeTags(req: Request, res: Response, next: NextFunction) {
    const id: number = req.params.id
    try {
      await linkQueries.removeTags(id) 
      res.json({ message: 'Success'})
    } catch(error) {
      res.json({ message: 'Unable to remove tags.', error })
    }
  }
  
  init() {
    this.router.get('/', this.getAll)
    this.router.get('/:id', this.getOne)
    this.router.use(auth.validateUser)
    this.router.put('/:id/rating', this.rate)
    this.router.use(auth.validateAdmin)
    this.router.post('/', this.add)
    this.router.post('/:id/tags', this.addTag)
    this.router.put('/:id', this.edit)
    this.router.delete('/:id', this.remove)
    this.router.delete('/:id/tags', this.removeTags)
    this.router.delete('/:id/tags/:tag_id', this.removeTag)
  }

}

const linkRoutes = new LinkRouter()
linkRoutes.init()

export default linkRoutes.router
