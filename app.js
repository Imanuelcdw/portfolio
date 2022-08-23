const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')

// Config
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(helmet())

// Middlewares
const errorHandler = require('./middlewares/error-handler')

// Routes
const projectRouter = require('./routes/project')

// Main
app.use('/api/project', projectRouter)
app.use(errorHandler)

// APP
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'portfolio' })
    app.listen(port, () => console.log(`App listening to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
