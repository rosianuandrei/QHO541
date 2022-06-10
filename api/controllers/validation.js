const { Validator, ValidationError } = require('jsonschema');
const applicationSchema = require('../schemas/applications.json').definitions.application;

const makeExpressValidator = (schema, resource) => {

    const v = new Validator();
    const validationOptions = {
        throwError: true,
        propertyName: resource
    };

    const handler = async (req, res, next) => {
    const body = req.body;

    try {
        v.validate(body, schema, validationOptions);
        await next();
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(error);
            res.status(400).json(error);
        } else {
            throw error;
        }
    }
}
return handler;
}

module.exports.validateApplication = makeExpressValidator(applicationSchema, 'application');