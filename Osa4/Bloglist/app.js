
require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const url = require('./utils/config')
const notesRouter = require('./controllers/notes')
app.use('/api/notes', notesRouter)

app.use(cors())
app.use(express.json())

mongoose.connect(url)
  .then(() => { console.log('Connected to MongoDB')
  })

