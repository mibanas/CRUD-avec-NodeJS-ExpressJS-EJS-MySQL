// importation des modules 
const express = require('express')
const bodyParser = require('body-parser');


// importation les méthodes et les modules local 
const categoriesRoutes = require('./routes/categories/category.routes')
const productsRoutes = require('./routes/products/product.routes')

// instancier un objet depuis les modules importées 
const app = express()


//  paramètres de configuration de l'application Express
app.set('view engine', 'ejs') //


//  middleware global
app.use(express.static('public')) 
app.use(bodyParser.urlencoded({ extended: false })); 


// monter un middleware local
app.use(categoriesRoutes)
app.use(productsRoutes)

//pages d'accueilles et autres 
app.get('/', (req, res) => {
    try {
        res.status(200).render('home.ejs')
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
})

app.get('/contact', (req, res) => {
    try {
        res.status(200).render('contact.ejs')
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
})

app.get('/blog', (req, res) => {
    try {
        res.status(200).render('blog.ejs')
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
})



// lancer application sur le port 3000 
app.listen(3000, ()=>{
    console.log("the application is running in the 3000 port")
})

