import * as mocha from 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')

import app from '../src/App'

chai.use(chaiHttp)
const expect = chai.expect

describe('RESTful API api/v1/tags', () => {

  it('responds with JSON object with the new tag', async () => {
    const res = await chai.request(app)
      .post('/api/v1/tags')
      .send({
          id: 0,
          name: 'JavaScript',
        })
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
    expect(res.body.tag).to.be.an('object')
    expect(res.body.tag.name).to.eq('JavaScript')
  })

  it('responds with JSON object with a tags array', async () => {
    const res = await chai.request(app).get('/api/v1/tags')
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
    expect(res.body.tags).to.be.an('array')
  })

  it('responds with single JSON object with a tag', async () => {
    const res = await chai.request(app).get('/api/v1/tags/0')
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
    expect(res.body.tag).to.be.an('object')
    expect(res.body.tag.name).to.eq('JavaScript')
  })

  it('responds with single JSON object with an updated tag', async () => {
    const res = await chai.request(app)
      .put('/api/v1/tags/0')
      .send({
          name: 'Node',
        })
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
    expect(res.body.tag).to.be.an('object')
    expect(res.body.tag.name).to.eq('Node')
  })

  it('responds with JSON object when deleting a tag', async () => {
    const res = await chai.request(app).del('/api/v1/tags/0')
    expect(res.status).to.equal(200)
    expect(res).to.be.json
    expect(res.body).to.be.an('object')
  })

})
