// importation des modules 
const Joi = require('joi');
const multer  = require('multer')
const path  = require('path')

// middlewares 
const productValidator = (req, res, next) => {
    // valider 
    const schema = Joi.object({

        product: Joi.string() 
            .trim() // suprimer les espaces au debut et au fin
            .min(3)
            .required(), // tjrs après le type string ou préférable à la fin 
    
        price: Joi.number()
            .integer()
            .positive()
            .required(),
        
        description : Joi.string()
            .trim() 
            .min(6)
            .required(),
        image : Joi.string(),
    })

    const {value, error} = schema.validate(req.body)
    console.log(req.body.image)

    if (error) {
        console.log("ici")
        const {path, message} = error.details[0]
        console.log(error.details[0])
        return res.render('pages/form.ejs',{
            error : {
                path : path[0], 
                message
            },
            req : {
                product : req.body.product,
                price : req.body.price,
                image : req.body.image,
                description : req.body.description,

            }
        })
    }
    next()
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../public/images`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })
  

exports.productValidator = productValidator
exports.upload = upload