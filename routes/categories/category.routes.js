// importation des modules 
const express = require('express')

// importation les méthodes et les modules local 
const categoriesController = require('../../controllers/category.controller')

// instancier un objet depuis les modules importées 
const routes = express.Router()


// gestion des itinéraires 
routes.get('/categories', categoriesController.getAllCategories)


// exporter l'objet 
module.exports = routes

