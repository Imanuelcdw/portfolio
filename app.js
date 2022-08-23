import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

const start = async () => {
  try {
    app.listen(port, () => console.log(`App listening to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
