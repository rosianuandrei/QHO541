module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/application",
    "title": "Application",
    "description": "An application in the Trading License Department",
    "type": "object",
    "properties": {
        "companyname": {
            "description": "The name of the company",
            "type": "string"
        },
        "address": {
            "description": "The address of the company",
            "type": "string"
        },
        "dateregistered": {
            "description": "The date when the application is received",
            "type": "string",
            "format": "date-time"
        },
        "companynumber": {
            "description": "The number registration of company",
            "type": "integer"
        },
        "sic": {
            "description": "The activity of the company",
            "type": "integer"
        },
        "status": {
            "description": "The status of the application",
            "type": "string"
        },
        "userid": {
            "description": "The user that made the application",
            "type": "integer"
        }
    },
    "required": ["companyname", "address", "companynumber", "sic", "userid"]
}