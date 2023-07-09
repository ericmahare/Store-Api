const Product = require('../models/product')
// Fetch all products data
exports.getAllProducts = async (req, res) => {
  const {featured, company, name, sort, fields} = req.query
  const filterObj = {}
  if(featured) {
    filterObj.featured = featured === "true"?true: false
  }
  if(company) {
    filterObj.company = company
  }
  if(name) {
    filterObj.name = {$regex: name, $options: 'i'}
  }

  let results = Product.find(filterObj)
  if(sort) {
    const sortList = sort.split(',').join(' ')
    results = results.sort(sortList)
  } else {
    results = results.sort('createdAt')
  }
  if(fields) {
    const fieldList = fields.split(',').join(' ')
    results = results.select(fieldList)
  }
  
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  results = results.skip(skip).limit(limit)
  
  const products = await results

  res.status(200).json({
    status: "Success",
    results: products.length,
    data: {
      products
    }
  })
}

// Fetch static products
exports.getSingleProductsStatic = async (req, res) => {
  const products = await Product.find().select('name price')
  res.status(200).json({
    status: "Succes",
    data: {
      products
    }
  })
}

exports.practice = async (req, res) => {
  const {featured, name, company, sort, fields, numericFilters} = req.query
  const filterObj = {}
  if(featured) {
    filterObj.featured = featured === "true"? true: false
  }
  if(name) {
    filterObj.name = {$regex: name, $options: 'i'}
  }
  if(company) {
    filterObj.company = company
  }

  // numeric filters
  if(numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
    }
    const regEx = /\b(<|>|=|<=|>=)\b/g
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
    const options = ['price', 'rating']
    filters = filters.split(',').forEach(el => {
      const [field, operator, value] = el.split('-')
      if(options.includes(field)) {
        filterObj[field] = { [operator]: Number(value)}
      }
    })
  }
  let results = Product.find(filterObj)
  // sort data
  // console.log(filterObj)
  if(sort) {
    const sortList = sort.split(',').join(' ')
    results = results.sort(sortList)
  }
  // select particular fields
  if(fields) {
    const fieldList = fields.split(',').join(' ')
    results = results.select(fieldList)
  }
  // pagination
  const page = Number(req.query.page) || 1
  const limit  = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  results = results.skip(skip).limit(limit)
  
  const products = await results

  res.status(200).json({
    status: "success",
    results: products.length,
    products
  })
}
