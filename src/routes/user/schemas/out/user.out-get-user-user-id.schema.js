module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        data: require('./user.schema')
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}