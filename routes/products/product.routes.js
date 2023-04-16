// importation des modules 
const express = require('express')

// importation les méthodes et les modules local 

    // controller 
    const productController = require('../../controllers/product.controller')

    // middleware
    const productChecker = require('../../middlewares/product.middlware')

// instancier un objet depuis les modules importées 
const routes = express.Router()


// gestion des itinéraires 
routes.get('/allProducts', productController.getAllProducts)
routes.get('/showproduct/:id', productController.showproduct)
routes.get('/form', productController.form)
routes.post('/addproduct', productChecker.upload.single('image'), productChecker.productValidator ,productController.addproduct)
routes.get('/delete/:id' ,productController.deleteProduct)
routes.get('/edit/:id', productChecker.upload.single('image') , productController.editProduct)



// exporter l'objet 
module.exports = routes

