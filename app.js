const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')

// Config
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(cors())

// Middlewares
const errorHandler = require('./middlewares/error-handler')

// Routes
const projectRouter = require('./routes/project')

// Main
app.use('/api/project', projectRouter)
app.use('/', (req, res) => res.json('/api/project'))
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
