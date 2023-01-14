module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "array",
          items: require('./item.schema')
        }
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}