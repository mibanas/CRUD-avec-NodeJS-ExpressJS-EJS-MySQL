// importation des modules 

// importation les méthodes et les modules local 
const connection = require('../config/database')

// liste des controlleurs 
const getAllCategories =  async (req,res) => {
    
    try {
        const [result] = await connection.query('SELECT * FROM categories')
        if (result) {
            res.send(result)
        } else {
            res.status(400).json({
                message : "bas request!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Server is down!"
        })
    }
}


// exporter les controlleurs 
exports.getAllCategories = getAllCategories

