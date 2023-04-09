const express = require('express')


const categoryRoutes = require('./routes/categories.routes')
const productRoutes = require('./routes/product.routes')
const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())

app.use(categoryRoutes)
app.use(productRoutes)


// configurez le moteur de template EJS
app.set('view engine' , 'ejs')
app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.send("Weelcom to my home")
// })

title = "hello word"

app.get('/', (req, res) => {
    res.render("home.ejs", {
        title
    })
})

app.listen(4000, () => {
    console.log("Server is running")
})


