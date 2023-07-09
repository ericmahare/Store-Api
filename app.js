const express = require('express')
require('dotenv').config({path: "./config.env"})
require('express-async-errors')
const connectDB = require('./db/connect')
const productRouter = require('./routes/products')
const notFound = require('./middleware/not-found')
const asyncErrors = require('./middleware/error-handler')
// setup expres
const app = express()
// middlewares
app.use(express.json())
app.use('/api/v1/products', productRouter)
app.use(notFound)
app.use(asyncErrors)
// Start the server
const port = process.env.PORT
const start = async () => {
  try {
    await connectDB
    app.listen(port, ()=>{
      console.log(`Listening to port ${port}`)
    })
  } catch(err) {
    const error = new Error(err)
    console.log(error.message)
  }
}

start()
