module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "array",
          items: require('./user.schema')
        },
        size: {type: "number"},
        page: {type: "number"},
        totalPages: {type: "number"}
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}