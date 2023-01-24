module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "object",
          properties: {
            item: require('./item.schema')
          }
        }
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}