module.exports = {
  type: "object",
  anyOf: [
    {
      properties: {
        user: require('../../../user/schemas/out/user.schema'),
        session: require('./session.schema')
      },
      additionalProperties: false
    },
    require('../../../../errors/error-response.schema')
  ]
}