// importation des modules 

// importation les méthodes et les modules local 
const connection = require('../config/database')

// liste des controlleurs 

const getAllProducts = async (req, res) => {
    try {
        const [result] = await connection.query(`SELECT * from product`)
        if (result) {
            res.status(200).render('pages/product.ejs', {
                allproducts : result
            })
        } else {
            res.status(400).json({
                message : "Bad request!"
            })
        }
    } catch (error) {
        
    }
}

const showproduct = async (req, res) => {

    try {
        let id = req.params.id
        const [result] = await connection.query(`SELECT * FROM product WHERE id_product = ?`, [id])

        if(result) {
            res.status(200).render('pages/showproduct.ejs', {
                products : result
            })
        } else {
            res.status(400).json({
                message : "bad Request!"
            })
        }
        
        
    } catch (error) {
        
    }
}

const form = async (req, res) => {
    // cette fonction afficher la page pour ajouter un produit 
    let message = null
    let path = null
    try {
        await res.render('pages/form.ejs', {
            error : {
                message : message,
                path : path,
                
            },
            req : {
                product : null,
                price : null,
                image : null,
                description :null,
            }
        })
    } catch (error) {
        res.status(400).json({
            message : "Bad request!",
            
        })
    }
}

const addproduct = async (req, res) => {
    // cette fonction permet d'ajouter un produit au base de données
    try {
        let {product, price, description} = req.body
        let image = "images/" + req.file.filename
        if (image == '') {
            image = "images/nophoto.png"
        }

        const result = await connection.query(`INSERT INTO product (title_product, description_product, url,prix, category_id) VALUES (?,?,?,?,?) `, [product,description,image, price,1])
        if (result.affectedRows == 1) {
            res.send(400).json({
                message : "bas request"
            })
        }else { 
            res.redirect('/allProducts'); 
        }
    } catch (error) {
        res.send(400).json({
            message : "baddds request"
        })
        // res.status(500)
        console.log("catch")
    }
}

const deleteProduct = async (req , res) => {
    try {
        let id = req.params.id
        const result = await connection.query(`DELETE FROM product WHERE id_product = ?`, [id])
        
        if(result.affectedRows == 0) {

            return res.status(400).send({
                message: "Bad request"
            })
        } else {
            res.redirect("/allProducts")
        }

    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
}

const editProduct = async (req, res) => {
    let message = null
    let path = null
    
    let id = req.params.id

    try {
        const [result] = await connection.query(`SELECT * FROM product WHERE id_product = ?`, [id])

        if (result.length == 0) {
            res.status(404).json({
                message : "Product is not found !"
            })
        }

         else {
            res.render('pages/edit.ejs', {
                products : result, 
                error : {
                    path,
                    message
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }

}

// exporter les controlleurs 
exports.getAllProducts = getAllProducts
exports.showproduct = showproduct
exports.form = form
exports.addproduct = addproduct
exports.deleteProduct = deleteProduct
exports.editProduct = editProduct