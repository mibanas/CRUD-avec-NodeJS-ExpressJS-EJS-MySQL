const connection = require('../config/bd')



const allproducts = async (req,res) => {
    try {
        const [results] = await connection.query('SELECT * FROM product')
        res.render("products/listproduct.ejs", {
            allproducts : results
        })
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
}

const addproduct = async (req, res) => {
    let {product, price, image, description } = req.body
    if (image == '') {
        image = "images/nophoto.png"
    }
    try {
        const result = await connection.query(`INSERT INTO product (title_product, description_product, url,prix, category_id) VALUES (?,?,?,?,?) `, [product,description,image, price,1])
        if (result.affectedRows == 1) {
            res.send(400).json({
                message : "bas request"
            })
        }else { 
            res.redirect('/productlist'); 
        }
    } catch (error) {
        res.status(500)
        console.log("catch")
    }

}

const forms = async (req, res) => {
    res.render("products/forms.ejs",)
}

const deleteproduct = async (req, res) => {
    id = req.params.id

    try {
        const [result] = await connection.query(`DELETE FROM product WHERE id_product = ?`, [id])
        if(result.affectedRows = 0) {
            res.status(400).json({
                message : "bas request!"
            })
        } else {
            res.redirect("/productlist")
        }
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
}

const showproduct = async (req,res) => {
    let id = req.params.id

    const [result] = await connection.query(`SELECT * FROM product WHERE id_product = ?`, [id])
    console.log(id, result)


    res.render('products/showproduct.ejs', { products: result });

}

const editforms = async (req, res) => {
    let id = req.params.id

    try {
        const [result] = await connection.query(`SELECT * FROM product WHERE id_product = ?`, [id])

        if (result.length == 0) {
            res.status(404).json({
                message : "course is not found !"
            })
        } else {
            res.render('products/editforms.ejs', { products: result });
        }
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }

}

const updateArticle = async (req, res) => {
    let id = req.params.id
    let {product, price, image, description} = req.body
    console.log(product, price, image, description, id)

    try {
        const result = await connection.query(`UPDATE product SET title_product = IFNULL(?, title_product), description_product = IFNULL(?, description_product), url = IFNULL(?, url), prix = IFNULL(?, prix)  WHERE id_product = ?`,  [product,description,image, price, id])
        
        if(result.affectedRows == 0) {

            return res.status(400).send({
                message: "Bad request"
            })
        } else {
            res.redirect("/productlist")
        }

    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
}

exports.allproducts = allproducts
exports.addproduct = addproduct
exports.forms = forms
exports.deleteproduct = deleteproduct
exports.showproduct = showproduct
exports.editforms = editforms
exports.updateArticle = updateArticle


