require('dotenv').config({path: './config.env'})
const connectDB = require('./db/connect')
const data = require('./products.json')
const Product = require('./models/product')

const start = async() => {
  try {
    await connectDB
    await Product.deleteMany()
    await Product.create(data)
    const products = await Product.find()
    console.log(products)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
