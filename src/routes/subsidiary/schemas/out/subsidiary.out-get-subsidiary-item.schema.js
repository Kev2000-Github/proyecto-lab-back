
const subsidiary = require('./subsidiary.schema')
const itemData = {
  type: "object",
  properties: {
    id: {type: "string"},
    name: {type: "string"},
    quantity: {type: "number"}
  }
}

module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {type: "string"},
              name: {type: "string"},
              Items: {
                type: "array",
                items: itemData
              }
            }
          }
        },
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}