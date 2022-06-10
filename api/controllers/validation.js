const { Validator, ValidationError } = require('jsonschema');
const schema = require('../schemas/applications.schema.js');
const v = new Validator();

module.exports.validateArticle = async (req, res, next) => {
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };

    const body = req.body;
    console.log(body);

    try {
        v.validate(body, schema, validationOptions);
        await next();
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json(error);
        } else {
            throw error;
        }
    }
} 
