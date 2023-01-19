module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: {
          type: "array",
          items: require('./user.schema')
        }
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}