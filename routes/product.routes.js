const express = require('express')
const productcontrollers = require('../controllers/products.controllers')
const routes = express.Router()

routes.get('/productlist', productcontrollers.allproducts)
routes.post('/addproduct', productcontrollers.addproduct)
routes.get('/forms', productcontrollers.forms)
routes.get('/delete/:id', productcontrollers.deleteproduct)
routes.get('/info/:id', productcontrollers.showproduct)
routes.get('/edit/:id', productcontrollers.editforms)
routes.post('/updateArticle/:id', productcontrollers.updateArticle)





module.exports = routes
