module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: require('./item.schema')
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}