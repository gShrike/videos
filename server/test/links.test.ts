import * as mocha from 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')

import app from '../src/App'

chai.use(chaiHttp)
const expect = chai.expect

describe('RESTful API api/v1/links', () => {

  it('responds with JSON object with the new link', async () => {
    const res = await chai.request(app)
      .post('/api/v1/links')
      .send({
          id: 0,
          url: 'https://www.youtube.com/watch?v=jJFd05_CjUY',
        })
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
    expect(res.body.link).to.be.an('object')
    expect(res.body.link.url).to.eq('https://www.youtube.com/watch?v=jJFd05_CjUY')
  })

  it('responds with JSON object with a links array', async () => {
    const res = await chai.request(app).get('/api/v1/links')
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
    expect(res.body.links).to.be.an('array')
  })

  it('responds with single JSON object with a link', async () => {
    const res = await chai.request(app).get('/api/v1/links/0')
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
    expect(res.body.link).to.be.an('object')
    expect(res.body.link.url).to.eq('https://www.youtube.com/watch?v=jJFd05_CjUY')
  })

  it('responds with single JSON object with an updated link', async () => {
    const res = await chai.request(app)
      .put('/api/v1/links/0')
      .send({
          url: 'https://www.youtube.com/watch?v=YSFIP0HsR7I',
        })
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
    expect(res.body.link).to.be.an('object')
    expect(res.body.link.url).to.eq('https://www.youtube.com/watch?v=YSFIP0HsR7I')
  })

  it('responds with JSON object when deleting a link', async () => {
    const res = await chai.request(app).del('/api/v1/links/0')
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
  })

})
