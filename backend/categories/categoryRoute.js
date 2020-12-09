const express = require('express')
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategory,
  updateCategory,
  deleteCategory
} = require('./categoryController')

const router = express.Router()

router.param('categoryId', getCategoryById)
router
  .route('/')
  .post(createCategory)
  .get(getAllCategories)

router
  .route('/:categoryId')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory)

module.exports = router
