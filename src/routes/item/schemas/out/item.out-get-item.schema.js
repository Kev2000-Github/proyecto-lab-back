module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "array",
          items: require('./item.schema')
        },
        size: {type: "number"},
        page: {type: "number"},
        totalPages: {type: "number"},
        count: {type: "number"}
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}