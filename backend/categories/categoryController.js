const category = require('./categoryModel')

// @desc    register a new category
// @route   POST /api/category/
// @access  Private/Admin

exports.createCategory = async (req, res) => {
  console.log('coming ito the category controller')
  console.log(await category.getDocumentByName(req.body.name))
  if ((await category.getDocumentByName(req.body.name)).length > 0) {
    return res.status(400).json({
      error: 'this category already exists'
    })
  } else {
    const newCategory = await category.createDocument(req.body)
    if (!newCategory.error) {
      res.status(201).json(newCategory)
    } else {
      res.status(400).json(newCategory)
    }
  }
}

// @desc    getting all categories
// @route   GET /api/category/
// @access  Public

exports.getAllCategories = async (req, res) => {
  const categories = await category.getAllDocuments()
  if (!categories.error) {
    res.status(200).json(categories)
  } else {
    res.status(400).json(categories)
  }
}

// @desc    getting category by id
// @route   GET /api/category/:categoryId
// @access  Public

exports.getCategory = async (req, res) => {
  return res.status(200).json(req.category)
}

// @desc    updating category by id
// @route   GET /api/category/:categoryId
// @access  Public

exports.updateCategory = async (req, res) => {
  console.log('req.body', req.body)

  const updatedCategory = await category.updateDocument({
    categoryId: req.category._id,
    newCategory: req.body
  })
  if (!updatedCategory.error) {
    res.status(200).json(updatedCategory)
  } else {
    res.status(400).json(updatedCategory)
  }
}

exports.deleteCategory = async (req, res) => {
  const deletedCategory = await category.deleteDocument(req.category._id)
  if (!deletedCategory.error) {
    res.status(200).json(deletedCategory)
  } else {
    res.status(400).json(deletedCategory)
  }
}

// middleware
exports.getCategoryById = async (req, res, next, id) => {
  const categoryDB = await category.getDocumentById(id)
  console.log('category database', categoryDB)
  if (!categoryDB) {
    res.status(404).send('category not found in the database')
  }
  if (!categoryDB.error) {
    req.category = categoryDB
    next()
  } else {
    res.status(400).json(categoryDB)
  }
}
