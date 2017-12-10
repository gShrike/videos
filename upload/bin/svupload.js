#! /usr/bin/env node

const prompt = require('prompt')
const colors = require('colors/safe')
const request = require('request-promise')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${createToken({ name: 'cli tool', isAdmin: true })}`
}

const settings = {
  properties: {
    title: {
      description: colors.cyan('What is the title?'),
      required: true
    },
    url: {
      description: colors.cyan('What is the URL?'),
      required: true
    },
    tags: {
      description: colors.cyan('What are the tags? (comma separated)')
    }
  }
}

prompt.message = ''
prompt.start()
prompt.get(settings, postPrompt)

function postPrompt(err, result) {
  if (err) {
    console.log(colors.red(`\n${err.message}`))
  } else {
    const link = { title: result.title, url: result.url }
    const tags = result.tags.split(',').map(tag => tag.trim() )
    postLink(link)
      .then(response => {
        if (response.error) {
          return Promise.reject(response.error)
        } else {
          return postTags(response.link, tags)
        }
      })
      .then((response) => {
        if (response.error) {
          return Promise.reject(link.error)
        } else {
          console.log(colors.green(`\nSuccess! ${link.title} has been added`))
        }
      })
      .catch((err) => {
        console.log(colors.red(`\nError ${err}`))
      });
  }
}

function postLink(link) {
  var options = {
    method: 'POST',
    uri: `${process.env.SERVER_URL}/api/v1/links`,
    body: link,
    json: true,
    headers
  };
  return request(options)
}

function postTags(link, tags) {
  const tagRequests = tags.map((tag) => {
    const options = {
      method: 'POST',
      uri: `${process.env.SERVER_URL}/api/v1/links/${link.id}/tags`,
      body: { tag },
      json: true,
      headers
    };
    return request(options)
  })
  return Promise.all(tagRequests) 
}

function createToken (data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' })
} 
