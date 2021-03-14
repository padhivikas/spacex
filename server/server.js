import express from 'express'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from '../src/App'

const PORT = 8080
const app = express()

var corsOptions = {
  origin: ['https://git.heroku.com/spacex-react01.git', 'http://localhost:8080'],
  methods: "GET",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const router = express.Router()

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
        )
        )
      })
    }
    router.get('^/$', serverRenderer)
    
    router.use(
      express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
      )
      
      // tell the app to use the above rules
  app.use(cors(corsOptions))
  app.use(router)
  
  // app.use(express.static('./build'))
  app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`)
  })


  