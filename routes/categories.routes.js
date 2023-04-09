const express = require('express')
const categoriesController = require('../controllers/categories.controllers')

const router = express.Router()

router.get('/allcategories', categoriesController.getAllCategory)
router.get('/category/:id', categoriesController.getGategory)
router.post('/addcategory', categoriesController.addCategorie)
router.put('/updatecategory', categoriesController.updateCategory)
router.patch('/patchcategory', categoriesController.patchCategory)
router.delete('/deletecategory/:id', categoriesController.deleteCategory)


module.exports = router 

