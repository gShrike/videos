import {Router, Request, Response, NextFunction} from 'express'
import Link from '../db/Link.model'
import linkQueries from '../db/link.queries'

export class LinkRouter {
  router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    const links: Link[] = await linkQueries.getAll()
    res.json({ message: 'Success', links })
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    let id: number = parseInt(req.params.id)
    const link: Link = await linkQueries.getOne(id) 
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

  public async edit(req: Request, res: Response, next: NextFunction) {
    let id: number = parseInt(req.params.id)
    const link: Link = await linkQueries.edit(id, req.body)
    res.json({ message: 'Success', link })
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    let id: number = parseInt(req.params.id)
    try {
      await linkQueries.remove(id) 
      res.json({ message: 'Success'})
    } catch(error) {
      res.json({ message: 'No link found with the given id.', error })
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

const linkRoutes = new LinkRouter()
linkRoutes.init()

export default linkRoutes.router
