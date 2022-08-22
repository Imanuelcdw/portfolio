import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

const start = () => {
  try {
    app.listen(() => console.log('Success'))
  } catch (error) {
    console.log(error)
  }
}
start()
