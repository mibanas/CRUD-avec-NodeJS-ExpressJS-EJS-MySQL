const connection = require('../config/bd')

const getAllCategory = async (req, res) => {
    try {
        const [result] = await connection.query('SELECT * FROM categories');
        res.status(200).send(result)
    } catch {
        res.status(500).json({
            message : "server is down!"
        })
    }
}

const getGategory = async (req, res) => {
    const id = req.params.id
    try {
        const [result] = await connection.query(`SELECT * FROM categories WHERE id_category = ?`, [id]); 
        console.log(result)
        if(result.length == 0) {
            res.status(404).json({
                message : "categorie is not found !"
            })
        } 
        res.status(200).send(result)
    } catch {
        res.status(500).json({
            message : "Server is down!"
        })
    }
}

const addCategorie = async (req, res) => {


    let  title = req.body.title
    let checkcategory = false 
   
    // check if category exist 
    try {
        const [check] = await connection.query('SELECT * FROM categories');
        for (let index = 0; index < check.length; index++) {
            if (title == check[index].title){
                checkcategory = true
            }
        }
    }
    catch {
        res.status(500).json({
            message : "Server is Down"
        })
    }
    // Add categort
    if (!checkcategory){
        try {

            const result = await connection.query('INSERT INTO categories (title) VALUES (?)' , [title])
            res.status(200).send(result)
    
        }
        catch {
            res.status().json({
                message : "Server is Down!"
            })
        }
    } else {
        res.json({
            message : "category already added"
        })
    }
}

const updateCategory = async (req, res) => {
    let {id_category , title} = req.body

    // check data if is empty ...
    if (title == '') {
        res.status(400).json({
            message : "Data is empty!"
        })
    }
    try {
        result = await connection.query('UPDATE categories SET title = ? WHERE id_category = ? ',[title, id_category])
    
        // check if data base is modified 
        if (result.affectedRows == 0) {
            res.status(400).json({
                message : "Your categoy is not updated"
            })
        }
    
        // data updated 
        res.status(200).send(result)
    } catch (error) {
            res.status().json({
                message : "Server id Down!",
            })
    }

}

const patchCategory = async (req,res) =>  {
    let {id_category, title} = req.body

    // check if data is empty
    if(title == '') {
        res.status(400).json({
            message : "Data is empty!"
        })
    }

    try {
        const result = await connection.query('UPDATE categories SET title = IFNULL(?, title) WHERE id_category = ?', [title, id_category])

        if (result.affectedRows == 0) {
            res.status(400).json({
                message : "Your category is not updated"
            })    
        }
        res.status(200).send(result)
    
    } catch (error) {
        res.status(500).json({ 
            message : "Server is down!"
        })
    }

}

const deleteCategory = async (req, res) => {
    let id_category = req.params.id 
    try {
        const result = await connection.query('DELETE FROM categories WHERE id_category = ?', [id_category]) 

        if(result.affectedRows = 0) {
            req.status(400).json({
                message : "...."
            })
        }
        res.status(200).json({
            message : "Your Category is delete id"
        })
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
}



exports.getAllCategory = getAllCategory
exports.getGategory = getGategory
exports.addCategorie = addCategorie
exports.updateCategory = updateCategory
exports.patchCategory = patchCategory
exports.deleteCategory = deleteCategory


