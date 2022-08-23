import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'portfolio' })
    app.listen(port, () => console.log(`App listening to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
